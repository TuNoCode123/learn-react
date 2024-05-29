import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title1: "There is so many quizzs for you",
        title2: "The Quizz is created by the different people in the world",
        title3: `There is so many quizzs for youLets Effort and join our Quizzs to get the good scores , and Overcome
        all the people`,
        title4: "There is so many quizzs for you",
      },
    },
    vi: {
      translation: {
        title1: "Có rất nhiều bài kiểm tra dành cho bạn",
        title2:
          "Những bài kiểm tra được tạo ra bởi tất cả mọi người khác nhau trên thế giới",
        title3: `có nhiều bài quizz , cùng lỗ lực vượt qua chúng nào`,
        title4: "There is so many quizzs for you",
      },
    },
  },
});

export default i18n;
