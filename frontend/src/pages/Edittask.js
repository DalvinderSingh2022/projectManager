import React, { useCallback, useEffect, useState } from 'react';
import Createtask from '../components/Createtask';
import { useParams } from 'react-router-dom';
import AlertBox from '../components/AlertBox';
import axios from "axios";

const Edittask = () => {
    const [addComment, setaddComment] = useState(false);
    const [alert, setAlert] = useState(null);
    const [task, setTask] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [comment, setcomment] = useState({
        comment: '',
        userName: ''
    });

    const loadComments = useCallback(() => {
        axios.get(`http://localhost:5000/api/projects/${id}/comments`)
            .then(({ data: comments }) => {
                setComments(comments);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${id}`)
            .then(({ data: tasks }) => {
                setTask(tasks);
            });
        axios.get("http://localhost:5000/api/users/current")
            .then(({ data: user }) => {
                setcomment(prev => ({ ...prev, userName: user.name }));
            });
        loadComments();
    }, [id, loadComments]);

    const handlesubmit = () => {
        if (!comment.comment) {
            setAlert({ message: "Comment can't be empty", type: 'report' });
        } else {
            axios.post(`http://localhost:5000/api/projects/${id}/comments`, comment)
                .then(() => {
                    setAlert({ message: 'Comment added', type: 'verified' });
                    setaddComment(false);
                    setcomment(prev => ({ ...prev, comment: '' }));
                    loadComments();
                })
                .catch((error) => {
                    console.error(error);
                    setAlert({ message: error.response.data.message, type: 'report' });
                });
        }
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
                            {addComment && <button className="btn round flex material-symbols-outlined" onClick={() => handlesubmit()}>save</button>}
                            <button className="btn round flex material-symbols-outlined" onClick={() => setaddComment(prev => !prev)}>{!addComment ? 'add' : "close"}</button>
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
                                <div className="task flex col items-start" key={comment._id}>
                                    <span className="text">{comment.comment}</span>
                                    <span className="by">{`${comment.userName} on ${new Date(comment.updatedAt).toLocaleString()}`}</span>
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