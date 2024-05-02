import { useState } from "react";

const CourseRegistration = ({ web3, courseContract, courseFee }) => {
  const [email, setEmail] = useState("");

  const payForCourse = async () => {
    if (!web3 || !courseContract) return;

    const accounts = await web3.eth.getAccounts();
    courseContract.methods
      .payForCourse(email)
      .send({ from: accounts[0], value: web3.utils.toWei(courseFee, "ether") })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-xl font-semibold">Hi 👋!</h1>
      <h1 className="text-2xl font-bold">Course Registration</h1>
      <p>Course Fee: {courseFee} ETH</p>
      <input
        className="border-2 border-gray-200 w-[360px] rounded-md px-4 py-2 my-4 bg-transparent "
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={payForCourse}
      >
        Pay for course
      </button>
    </div>
  );
};

export default CourseRegistration;
