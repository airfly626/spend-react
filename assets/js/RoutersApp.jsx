import { Routes, Route } from "react-router";
import Layout from "./Layout";
import Record from "./pages/Record/index";
import DetailTable from "./pages/DetailTable/index";
import NotFound from './pages/NotFound';

export default function RoutersApp() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Record />} />
                <Route path="DetailTable" element={<DetailTable />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}