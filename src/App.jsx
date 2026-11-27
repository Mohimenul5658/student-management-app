import { useMemo, useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  Mail,
  Phone,
  Building2,
  UserRound,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Ayesha Rahman",
    email: "ayesha.rahman@email.com",
    phone: "+880 1712-345678",
    department: "Computer Science",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    email: "tanvir.hasan@email.com",
    phone: "+880 1812-456789",
    department: "Business Administration",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@email.com",
    phone: "+880 1912-567890",
    department: "Economics",
  },
  {
    id: 4,
    name: "Rafi Ahmed",
    email: "rafi.ahmed@email.com",
    phone: "+880 1612-678901",
    department: "Electrical Engineering",
  },
];
const departments = [
  "Computer Science",
  "Business Administration",
  "Economics",
  "Electrical Engineering",
  "English",
  "Mathematics",
  "Other",
];
const colors = ["lavender", "mint", "peach", "blue", "pink"];
const blank = { name: "", email: "", phone: "", department: "" };

function App() {
  const [students, setStudents] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("studenthub-students")) ||
        initialStudents
      );
    } catch {
      return initialStudents;
    }
  });
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  const persist = (next) => {
    setStudents(next);
    localStorage.setItem("studenthub-students", JSON.stringify(next));
  };
  const shown = useMemo(
    () =>
      students.filter((s) =>
        s.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [students, query],
  );
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (editing !== null) {
      persist(students.map((s) => (s.id === editing ? { ...s, ...form } : s)));
      setNotice("Student details updated");
    } else {
      persist([{ ...form, id: Date.now() }, ...students]);
      setNotice("Student added successfully");
    }
    setForm(blank);
    setEditing(null);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const edit = (student) => {
    setEditing(student.id);
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const remove = (id) => {
    persist(students.filter((s) => s.id !== id));
    if (editing === id) {
      setEditing(null);
      setForm(blank);
    }
    setNotice("Student removed");
    window.setTimeout(() => setNotice(""), 2600);
  };
  const cancel = () => {
    setEditing(null);
    setForm(blank);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="StudentHub home">
          <span className="brand-mark">
            <GraduationCap size={21} strokeWidth={2.2} />
          </span>
          <span>
            student<span className="brand-accent">hub</span>
          </span>
        </a>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          <a className="nav-item" href="#top">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a className="nav-item active" href="#students">
            <Users size={18} />
            Students<span className="nav-count">{students.length}</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <Sparkles size={17} />
            </div>
            <strong>Keep things organized</strong>
            <p>Your student records are saved automatically on this device.</p>
          </div>
          <div className="profile">
            <div className="profile-avatar">AD</div>
            <div className="profile-copy">
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>
            <ChevronDown size={16} className="profile-chevron" />
          </div>
        </div>
      </aside>

      <main className="main" id="top">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Students</strong>
          </div>
          <div className="topbar-right">
            <span className="online-dot" />
            All changes saved
          </div>
        </header>
        <div className="content">
          <section className="welcome">
            <div>
              <div className="eyebrow">
                <span /> STUDENT DIRECTORY
              </div>
              <h1>Students</h1>
              <p>Manage your student records all in one place.</p>
            </div>
            <div className="welcome-art">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-cap">
                <GraduationCap size={39} />
              </div>
              <span className="art-spark spark-a">✦</span>
              <span className="art-spark spark-b">✦</span>
            </div>
          </section>

          {notice && (
            <div className="toast" role="status">
              {notice}
            </div>
          )}
          <section className="overview-card">
            <div className="overview-icon">
              <Users size={21} />
            </div>
            <div className="overview-text">
              <span>Total students</span>
              <strong>{students.length.toString().padStart(2, "0")}</strong>
            </div>
            <div className="overview-divider" />
            <div className="overview-note">
              <span className="note-check">✓</span>
              <span>
                Your directory is
                <br />
                <strong>up to date</strong>
              </span>
            </div>
            <div className="overview-decoration">✳</div>
          </section>

          <div className="section-heading" id="students">
            <div>
              <h2>Student directory</h2>
              <p>A list of everyone enrolled in your institution.</p>
            </div>
            <span className="count-pill">
              {shown.length} {shown.length === 1 ? "student" : "students"}
            </span>
          </div>

          <section className="directory-card">
            <div className="directory-toolbar">
              <div className="search-wrap">
                <Search size={17} />
                <input
                  aria-label="Search students by name"
                  placeholder="Search by student name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    className="clear-search"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
                <kbd>⌘ K</kbd>
              </div>
              <div className="toolbar-right">
                <span className="sort-label">
                  Showing <strong>{shown.length}</strong> of{" "}
                  <strong>{students.length}</strong>
                </span>
                <button
                  className="primary-btn"
                  onClick={() => {
                    cancel();
                    document.getElementById("name")?.focus();
                  }}
                >
                  <Plus size={17} />
                  Add student
                </button>
              </div>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>PHONE NUMBER</th>
                    <th>DEPARTMENT</th>
                    <th className="actions-heading">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((student, index) => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-cell">
                          <div
                            className={`student-avatar ${colors[index % colors.length]}`}
                          >
                            {student.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div className="student-info">
                            <strong>{student.name}</strong>
                            <span>
                              <Mail size={13} />
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="phone-cell">
                          <Phone size={14} />
                          {student.phone}
                        </span>
                      </td>
                      <td>
                        <span className="department-pill">
                          <span className="department-dot" />
                          {student.department}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-btn edit-btn"
                            onClick={() => edit(student)}
                            aria-label={`Edit ${student.name}`}
                            title="Edit student"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="icon-btn delete-btn"
                            onClick={() => remove(student.id)}
                            aria-label={`Delete ${student.name}`}
                            title="Delete student"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {shown.length === 0 && (
                    <tr>
                      <td colSpan="4">
                        <div className="empty-state">
                          <div className="empty-icon">
                            <UserRound size={24} />
                          </div>
                          <strong>
                            {query ? "No students found" : "No students yet"}
                          </strong>
                          <span>
                            {query
                              ? `No results for “${query}”. Try another name.`
                              : "Add your first student to get started."}
                          </span>
                          {query && (
                            <button
                              className="text-button"
                              onClick={() => setQuery("")}
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>
                Showing{" "}
                <strong>
                  {shown.length ? 1 : 0}–{shown.length}
                </strong>{" "}
                of <strong>{shown.length}</strong> students
              </span>
              <span className="saved-hint">
                <span className="online-dot" />
                Saved to this device
              </span>
            </div>
          </section>

          <footer className="footer">
            <span>© 2025 StudentHub</span>
            <span>
              Simple records, happy classrooms <span className="heart">♥</span>
            </span>
          </footer>
        </div>
      </main>

      <aside className="form-panel">
        <div className="form-panel-inner">
          <div className="form-heading">
            <div className="form-title-icon">
              <Plus size={20} />
            </div>
            <div>
              <div className="form-kicker">STUDENT RECORD</div>
              <h2>{editing !== null ? "Edit student" : "Add a student"}</h2>
            </div>
          </div>
          <p className="form-intro">
            {editing !== null
              ? "Update the student’s details below."
              : "Fill in the details below to add someone to your directory."}
          </p>
          <form onSubmit={submit} className="student-form">
            <label htmlFor="name">Student name</label>
            <div className="input-wrap">
              <UserRound size={16} />
              <input
                id="name"
                required
                placeholder="e.g. Ayesha Rahman"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap">
              <Mail size={16} />
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <label htmlFor="phone">Phone number</label>
            <div className="input-wrap">
              <Phone size={16} />
              <input
                id="phone"
                type="tel"
                required
                placeholder="+880 1XXX-XXXXXX"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <label htmlFor="department">Department</label>
            <div className="select-wrap">
              <Building2 size={16} />
              <select
                id="department"
                required
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
              >
                <option value="" disabled>
                  Select a department
                </option>
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
              <ChevronDown size={15} className="select-chevron" />
            </div>
            <div className="form-actions">
              {editing !== null && (
                <button type="button" className="cancel-btn" onClick={cancel}>
                  Cancel
                </button>
              )}
              <button className="submit-btn" type="submit">
                {editing !== null ? (
                  <>
                    <Pencil size={16} />
                    Save changes
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Add student
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="privacy-note">
            <span className="privacy-lock">✓</span>
            <span>
              <strong>Your data stays yours</strong>
              <br />
              Student records are stored locally in your browser.
            </span>
          </div>
          <div className="panel-bottom">
            <BookOpen size={15} /> Made for better organized classrooms
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
