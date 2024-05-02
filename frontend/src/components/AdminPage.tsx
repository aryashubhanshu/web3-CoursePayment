import { useEffect, useState } from "react";

const AdminPage = ({ web3, courseContract }) => {
  const [payments, setPayments] = useState([]);

  const init = () => {
    if (!web3 || !courseContract) return;
    console.log(courseContract.methods.payments);

    courseContract.methods
      .getAllPayments()
      .call()
      .then((values) => {
        setPayments(values);
      });
  };

  useEffect(() => {
    if (web3 && courseContract) {
      init();
    }
  }, [web3, courseContract]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-xl font-semibold">Hi 👋!</h1>
      <p>Total {payments.length} people have brought the course!</p>
      {payments.map((payment, ind) => (
        <div key={ind}>{payment.email}</div>
      ))}
    </div>
  );
};

export default AdminPage;
