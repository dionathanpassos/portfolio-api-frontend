import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import AdminLayout from "../layouts/AdminLayout";
import HeroPage from "../pages/admin/Hero/HeroPage";
import AboutPage from "../pages/admin/About/AboutPage";
import StackPage from "../pages/admin/Stack/StackPage";
import ProjectPage from "../pages/admin/Project/ProjectPage";
import TimelinePage from "../pages/admin/Timeline/TimelinePage";
import MidiaPage from "../pages/admin/Midia/MidiaPage";
import Auth from "../pages/auth/Auth";
import OverviewPage from "../pages/admin/Overview/OverviewPage";

export default function AppRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/auth" element={<Auth/>}/>

            <Route path="/admin" element={<AdminLayout/>}>
                <Route path="/admin/" element={<OverviewPage/>}/>
                <Route path="hero" element={<HeroPage/>}/>
                <Route path="sobre" element={<AboutPage/>}/>
                <Route path="stack" element={<StackPage/>}/>
                <Route path="projetos" element={<ProjectPage/>}/>
                <Route path="timeline" element={<TimelinePage/>}/>
                <Route path="contato" element={<MidiaPage/>}/>

            </Route>
        </Routes>
        </BrowserRouter>
    );
}