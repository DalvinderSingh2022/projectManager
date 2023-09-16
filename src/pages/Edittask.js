import React, { useContext, useEffect, useState } from 'react';
import Createtask from '../components/Createtask';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Edittask = () => {
    const [addComment, setaddComment] = useState(false);
    const [task, setTasks] = useState({});
    const { dbTasks, currentUser, updatedb, dbcomments } = useContext(AppContext);
    const { id } = useParams();
    const [comment, setcomment] = useState({
        comment: '',
        by: currentUser.user.displayName,
        uid: id + ":" + currentUser.user.uid + ":" + new Date().getTime()
    })

    useEffect(() => {
        setTasks(dbTasks.filter(a => {
            return a.uid === id
        })[0]);
    }, [dbTasks, id]);

    const handlesubmit = () => {
        const database = async () => {
            setDoc(doc(db, "comments", comment.uid), { ...comment })
                .then(updatedb(prev => !prev));
        }
        database();
    }

    return (
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
                    {dbcomments && dbcomments.map(comment => {
                        return (
                            <div className="task flex col items-start" key={comment.uid}>
                                <span className="text">{comment.comment}</span>
                                <span className="by">{comment.by + " ," + new Date(Number(comment.uid.split(":")[4])).toDateString() + " at " + new Date(Number(comment.uid.split(":")[4])).toLocaleTimeString()}</span>
                            </div>);
                    })}
                </div>
            </section >
        </div >
    )
}

export default Edittask;