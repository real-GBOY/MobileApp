/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: [
      "./App.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
   ],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         fontFamily: {
            "sf-rounded": [
               "SF-Pro-Rounded-Regular",
               "SF-Pro-Rounded-Medium",
               "SF-Pro-Rounded-Semibold",
               "SF-Pro-Rounded-Bold",
               "system-ui",
               "-apple-system",
               "sans-serif",
            ],
            "sf-rounded-regular": ["SF-Pro-Rounded-Regular"],
            "sf-rounded-medium": ["SF-Pro-Rounded-Medium"],
            "sf-rounded-semibold": ["SF-Pro-Rounded-Semibold"],
            "sf-rounded-bold": ["SF-Pro-Rounded-Bold"],
            tajawal: [
               "Tajawal-Regular",
               "Tajawal-Medium",
               "Tajawal-Bold",
               "Tajawal-ExtraBold",
               "system-ui",
               "sans-serif",
            ],
            "tajawal-regular": ["Tajawal-Regular"],
            "tajawal-medium": ["Tajawal-Medium"],
            "tajawal-bold": ["Tajawal-Bold"],
            "tajawal-extrabold": ["Tajawal-ExtraBold"],
         },
      },
   },
   plugins: [],
};
