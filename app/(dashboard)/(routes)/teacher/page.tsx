import { redirect } from "next/navigation";

const TeacherPage = () => {
    return redirect("/teacher/settings/courses");
}

export default TeacherPage;
