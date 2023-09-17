import React, { useContext, useEffect, useState } from 'react';
import Createtask from '../components/Createtask';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AlertBox from '../components/AlertBox';

const Edittask = () => {
    const { dbTasks, currentUser, updatedb, dbcomments } = useContext(AppContext);
    const [addComment, setaddComment] = useState(false);
    const [alert, setAlert] = useState(null);
    const [task, setTask] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [comment, setcomment] = useState({
        comment: '',
        by: currentUser.user.displayName,
        uid: id + "$" + currentUser.user.uid + "$" + new Date().getTime(),
    })

    useEffect(() => {
        setTask(dbTasks.filter(a => a.uid === id)[0]);
        setComments(dbcomments.filter(a => a.uid.split("$")[0] === task.uid));
    }, [dbTasks, id, dbcomments, task]);

    const handlesubmit = () => {
        const database = async () => {
            if (!comment.comment) {
                setAlert({ message: "Comment can't be null or empty", type: 'report' });
            } else {
                setDoc(doc(db, "comments", comment.uid), { ...comment })
                    .then(() => {
                        setAlert({ message: 'Comment added', type: 'verified' });
                        setTimeout(() => {
                            setaddComment(false);
                            setcomment(prev => ({ ...prev, comment: '' }));
                            updatedb(prev => !prev);
                        }, 2500)
                    })
                    .catch(error => {
                        setAlert({ message: error.message, type: 'report' });
                        console.error(error);
                    });
            }
        }
        database();
    }

    return (
        <>
            <div className='container'>
                <section>
                    <div className="heading">Edit Task</div>
                    <Createtask {...task} isEdit={true} />
                </section>
                <section className='flex col j-start items-stretch gap2'>
                    <div className="flex j-between">
                        <div className="heading">Comments</div>
                        <div className="flex gap2">
                            {addComment && <button className="btn round material-symbols-outlined" onClick={() => handlesubmit()}>save</button>}
                            <button className="btn round material-symbols-outlined" onClick={() => setaddComment(prev => !prev)}>{!addComment ? 'add' : "close"}</button> :
                        </div>
                    </div>
                    {addComment &&
                        <form className='w-full'>
                            <div className='flex col items-stretch w-full'>
                                <textarea
                                    rows={3}
                                    type="text"
                                    placeholder='Enter comment'
                                    value={comment.comment}
                                    onChange={(e) => setcomment(prev => ({ ...prev, comment: e.target.value }))}
                                />
                            </div>
                        </form>}
                    <div className="flex col tasks items-stretch j-start comments">
                        {comments && comments.map(comment => {
                            return (
                                <div className="task flex col items-start" key={comment.uid}>
                                    <span className="text">{comment.comment}</span>
                                    <span className="by">{comment.by + " ," + new Date(Number(comment.uid.split("$")[2])).toDateString() + " at " + new Date(Number(comment.uid.split("$")[2])).toLocaleTimeString()}</span>
                                </div>);
                        })}
                    </div>
                </section >
            </div >
            {alert && <AlertBox {...alert} setAlert={setAlert} />}
        </>
    )
}

export default Edittask;