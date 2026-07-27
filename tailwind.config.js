const config = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            screens: {
                other: { min: "340px", max: "1200px" },
            },
            fontFamily: {
                sans: ['"Netflix Sans"', "Roboto", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
            },
            colors: {
                "netflix-red": "#e50914",
                "feature-card": "#1d153f",
                "deep-space": "#000000",
                graphite: "#2d2d2d",
                charcoal: "#414141",
                slate: "#5a5a5a",
                ash: "#808080",
                silver: "#b3b3b3",
                "chalk-white": "#ffffff",
            },
            fontSize: {
                caption: ["13px", "1.5"],
                body: ["16px", "1.5"],
                subheading: ["20px", "1.25"],
                "heading-sm": ["24px", "1.2"],
                heading: ["56px", "1.17"],
                display: ["100px", "1"],
            },
            spacing: {
                4: "4px",
                8: "8px",
                12: "12px",
                16: "16px",
                24: "24px",
                32: "32px",
                36: "36px",
                64: "64px",
                100: "100px",
                128: "128px",
                148: "148px",
            },
            borderRadius: {
                cards: "16px",
                inputs: "4px",
                buttons: "4px",
            },
        },
    },
    plugins: [],
};

export default config;
