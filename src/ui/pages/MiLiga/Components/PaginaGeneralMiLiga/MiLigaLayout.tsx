import { LigaNavBar } from "../Common/LigaNavBar/LigaNavBar";
import { Outlet, useParams } from "react-router-dom";

export const MiLigaLayout: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <LigaNavBar ligaId={Number(id)} />
      <Outlet />
    </div>
  );
};
