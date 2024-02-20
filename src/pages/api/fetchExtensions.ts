// import { NextApiHandler } from "next";

// const handler: NextApiHandler = async (req, res) => {
//   try {
//     const body = req.body; // Ahora esperamos un array llamado 'extensions' en el cuerpo de la solicitud

//     const response = await fetch(
//       "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json;api-version=3.0-preview.1",
//           "Accept-Enconding": "gzip, deflate, br",
//         },
//         body: body,
//       }
//     );

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching extensions:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export default handler;
