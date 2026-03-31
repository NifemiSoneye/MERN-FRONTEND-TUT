import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm.jsx";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth.js";
import { PulseLoader } from "react-spinners";

const EditNote = () => {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditNote;
