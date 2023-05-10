/** @type {import('tailwindcss').Config} */

const colors = {
    mainPurple: "#583f72",
    palePurple: "#EDE9FE",
    textPurple: "#b185dd",
    infoTextGray: "#4B5563",
    commonDarkText: "#292611",
    colorForAreaTest: "#FBBF24",
    secondaryBgColor: "#EBE0FF",
    sectionPurple: "#e7d4ff",
};

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        backgroundColor: {
            mainPurple: colors.mainPurple,
            backgroundPurple: colors.palePurple,
            buttonPurple: colors.mainPurple,
            white: "#fff",
            colorForAreaTest: colors.colorForAreaTest,
            secondaryBgColor: colors.secondaryBgColor,
            sectionPurple: colors.sectionPurple,
        },
        textColor: {
            textPurple: colors.textPurple,
            darkPurple: colors.mainPurple,
            white: "#fff",
            questionTextGray: colors.infoTextGray,
            commonTextColor: colors.commonDarkText,
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
