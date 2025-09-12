import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/admin/contactThunks/ContactThunks";
import type { RootState, AppDispatch } from "../../redux/store";

const UserMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading } = useSelector((state: RootState) => state.adminContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Loading messages...</p>
    );

  const openGmailCompose = (userEmail: string, userName: string) => {
    const subject = encodeURIComponent("Reply from Admin");
    const body = encodeURIComponent(
      `Hi ${userName},\n\nYour message has been received. \n\nType your reply here...`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${userEmail}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((msg) => (
          <div
            key={msg.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              <span className="text-gray-900">{msg.name}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              <span className="text-blue-600 underline">{msg.email}</span>
            </p>
            <p className="mb-4 text-gray-800">
              <span className="font-semibold text-gray-700">Message:</span>{" "}
              {msg.message}
            </p>
            <button
              onClick={() => openGmailCompose(msg.email, msg.name)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Reply via Gmail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMessages;
