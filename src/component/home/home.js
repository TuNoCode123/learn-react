import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const House = (props) => {
  const data = useSelector((state) => state.login.user);
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className="test">
        <div title="title1">{t("title1")}</div>
        <div title="title2">{t("title2")}</div>
        <div title="title3">{t("title3")}</div>
        <div title="title4">
          {data ? (
            <button className="btn btn-dark ms-5" onClick={() => nav("/user")}>
              do quizz now
            </button>
          ) : (
            <button className="btn btn-dark ms-5" onClick={() => nav("/login")}>
              Login to doing quizz
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default House;
