// import React, { useState } from 'react';
// import AlertBox from '../components/AlertBox';
// import { Link, useNavigate } from 'react-router-dom';

// const Reset = () => {
//     const [alert, setAlert] = useState(null);
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const handlesubmit = (e) => {
//         e.preventDefault();
//         sendPasswordResetEmail(auth, email)
//             .then(() => {
//                 setAlert({ message: 'Mail send, check mails and Proceed', type: 'verified' });
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2500);
//             }).catch((error) => {
//                 setAlert({ message: error.message, type: 'report' });
//                 console.error(error);
//             });
//     }

//     return (
//         <>
//             <div className="flex account full">
//                 <section className='flex col gap'>
//                     <div>
//                         <h1>Welcome back</h1>
//                         <p>Welcome back! Please enter your details.</p>
//                     </div>
//                     <form className='flex col gap2' onSubmit={(e) => handlesubmit(e)}>
//                         <div className='flex col items-stretch w-full'>
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 id='email'
//                                 name='email'
//                                 placeholder='Enter email'
//                                 value={email || ''}
//                                 onChange={(e) => setEmail(e.target.value)} />
//                         </div>

//                         <div className='flex col items-stretch w-full submit'>
//                             <button type='submit' className="btn pri submit">Send Verification Mail</button>
//                         </div>

//                         <div className='change'>
//                             Don’t have an account?
//                             <button type='button'><Link to='/register'>register</Link></button>
//                         </div>
//                     </form>
//                 </section>
//             </div>
//             {alert && <AlertBox {...alert} setAlert={setAlert} />}
//         </>
//     )
// }

// export default Reset;

import React from 'react'

const Reset = () => {
    return (
        <div>

        </div>
    )
}

export default Reset
