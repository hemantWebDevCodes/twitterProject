import React,{useState} from 'react'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [mobile_number, setMobileNumber] = useState('');

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8000/api/signUp', {name, email, password, dob, mobile_number});

            console.log(response, 'login Successfully.');
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='w-full h-screen'>
        <div className="w-64 p-6 rounded-lg bg-slate-950 text-white mx-auto mt-10">
          <form onSubmit={handleSignup}>
            <h2 className='text-2xl'>SignUp Form</h2>

            <div className="mb-3">
                <label htmlFor="name">Name : </label>
               <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='w-full rounded outline-none py-2 pl-2 text-black'/>
            </div>

            <div className="my-4">
               <label htmlFor="email">Email : </label>
               <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='w-full rounded outline-none py-2 pl-2 text-black'/>
            </div>

            <div className="mb-3">
                <label htmlFor="password">Password : </label>
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className='w-full rounded outline-none py-2 pl-2 text-black'/>
            </div>

            <div className="mb-3">
                <label htmlFor="dob">Dob : </label>
               <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder='Enter Dob' className='w-full rounded outline-none py-2 pl-2 text-black'/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="mobile_number">Mobile Number : </label>
               <input type="text" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter Password' className='w-full rounded outline-none py-2 pl-2 text-black'/>
            </div>

            <button type='submit' className='py-3 px-4 w-full mt-2 rounded-lg bg-blue-300 '>SignUp</button>
        </form>
        </div>
    </div>
  )
}

export default Signup
