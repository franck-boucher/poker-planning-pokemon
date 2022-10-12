import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="flex gap-2 justify-center text-sm">
      <span>
        {t("footer.madeBy")}{" "}
        <a className="font-bold" href="https://fboucher.com/" target="_blank">
          Franck Boucher
        </a>
      </span>
      ·
      <a
        className="font-bold"
        href="https://github.com/franck-boucher/poker-planning-pokemon"
        target="_blank"
      >
        GitHub
      </a>
    </footer>
  );
};
