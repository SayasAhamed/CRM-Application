import { useEffect, useState } from "react";

import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../api/api";

import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function Notes({ leadId }) {

  const [notes, setNotes] = useState([]);

  const [content, setContent] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editContent, setEditContent] =
    useState("");


  // =========================================
  // LOAD NOTES
  // =========================================

  useEffect(() => {

    loadNotes();

  }, [leadId]);

  const loadNotes = async () => {

    try {

      const data = await getNotes(leadId);

      setNotes(data);

    } catch (err) {

      console.log(err);
    }
  };


  // =========================================
  // ADD NOTE
  // =========================================

  const handleAdd = async () => {

    if (!content.trim()) {

      alert("Please enter a note");

      return;
    }

    const confirmAdd =
      window.confirm(
        "Are you sure you want to add this note?"
      );

    if (!confirmAdd) return;

    try {

      await addNote({

        content,

        created_by: "Admin",

        lead_id: leadId,
      });

      setContent("");

      loadNotes();

    } catch (err) {

      console.log(err);

      alert("Failed to add note");
    }
  };


  // =========================================
  // DELETE NOTE
  // =========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this note?"
      );

    if (!confirmDelete) return;

    try {

      await deleteNote(id);

      loadNotes();

    } catch (err) {

      console.log(err);

      alert("Failed to delete note");
    }
  };


  // =========================================
  // START EDIT
  // =========================================

  const startEdit = (note) => {

    setEditingId(note.id);

    setEditContent(note.content);
  };


  // =========================================
  // UPDATE NOTE
  // =========================================

  const handleUpdate = async (id) => {

    if (!editContent.trim()) {

      alert("Note cannot be empty");

      return;
    }

    const confirmUpdate =
      window.confirm(
        "Are you sure you want to update this note?"
      );

    if (!confirmUpdate) return;

    try {

      await updateNote(id, {

        content: editContent,
      });

      setEditingId(null);

      setEditContent("");

      loadNotes();

    } catch (err) {

      console.log(err);

      alert("Failed to update note");
    }
  };


  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date)
      .toLocaleString();
  };


  return (

    <div className="p-5 mt-6 bg-gray-100 border shadow-sm rounded-2xl">

      <h3 className="mb-5 text-2xl font-bold text-center text-gray-800">

        Lead Notes

      </h3>


      {/* NOTES LIST */}

      <div className="space-y-4">

        {notes.length === 0 && (

          <div className="py-6 text-sm text-center text-gray-500">

            No notes added yet

          </div>
        )}


        {notes.map((n) => (

          <div
            key={n.id}
            className="p-4 bg-white border shadow-sm rounded-2xl"
          >


            {/* EDIT MODE */}

            {editingId === n.id ? (

              <>

                <textarea
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(
                      e.target.value
                    )
                  }
                  className="w-full p-3 text-sm border rounded-xl focus:outline-none"
                  rows={3}
                />

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      handleUpdate(n.id)
                    }
                    className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-xl hover:bg-green-600"
                  >

                    <FaSave size={14} />

                  </button>

                  <button
                    onClick={() =>
                      setEditingId(null)
                    }
                    className="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-xl hover:bg-gray-600"
                  >

                    <FaTimes size={14} />

                  </button>

                </div>

              </>

            ) : (

              <>

                {/* NOTE CONTENT */}

                <div className="text-sm leading-relaxed text-gray-800">

                  {n.content}

                </div>


                {/* NOTE META */}

                <div className="flex flex-col gap-1 mt-3 text-xs text-gray-500 md:flex-row md:justify-between">

                  <span>

                    Added by:
                    {" "}
                    <span className="font-semibold">

                      {n.created_by}

                    </span>

                  </span>

                  <span>

                    {formatDate(
                      n.created_at
                    )}

                  </span>

                </div>


                {/* ACTION BUTTONS */}

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      startEdit(n)
                    }
                    className="flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-xl hover:bg-yellow-600"
                  >

                    <FaEdit size={13} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(n.id)
                    }
                    className="flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded-xl hover:bg-red-600"
                  >

                    <FaTrash size={13} />

                  </button>

                </div>

              </>

            )}

          </div>

        ))}

      </div>


      {/* ADD NOTE */}

      <div className="flex flex-col gap-3 mt-6 md:flex-row">

        <input
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Add a note..."
          className="flex-1 p-3 text-sm border rounded-xl focus:outline-none"
        />

        <button
          onClick={handleAdd}
          className="px-6 py-3 text-sm font-semibold text-white transition bg-green-600 rounded-xl hover:bg-green-700"
        >

          Add Note

        </button>

      </div>

    </div>
  );
}