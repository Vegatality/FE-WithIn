/** @type {import('tailwindcss').Config} */

const colors = {
  mainPurple: "#583f72",
  palePurple: "#EDE9FE",
  textPurple: "#b185dd",
  infoTextGray: "#4B5563",
  commonDarkText: "#292611",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundColor: {
      mainPurple: colors.mainPurple,
      backgroundPurple: colors.palePurple,
      buttonPurple: colors.mainPurple,
      white: "#fff",
    },
    textColor: {
      textPurple: colors.textPurple,
      white: "#fff",
      questionTextGray: colors.infoTextGray,
      commomTextColor: colors.commonDarkText,
    },
    borderColor: {
      mainPurple: colors.mainPurple,
    },
    ringColor: {
      mainPurple: colors.mainPurple,
      // default: colors.mainPurple,
    },
    extend: {},
  },
  plugins: [],
};
