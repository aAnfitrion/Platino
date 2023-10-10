import { Message, EmbedBuilder } from "discord.js";
import axios from "axios";

export default async function teclaIp(message: Message) {
  if (!message.content.startsWith("IP") && !message.content.startsWith("ip"))
    return;

  require("dotenv").config();
  const { TECLA_NOMBRE: nombre, TECLA_IP: ip } = process.env;

  const estadoServidor = await axios
    .get(`https://api.mcsrvstat.us/3/${ip}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  let embedDescripcion = "";
  let embedFields = [];
  if (estadoServidor.online) {
    embedDescripcion = `La dirección IP del servidor es: __${ip}__`;
    embedFields = [
      {
        name: "Jugadores",
        value: `👥 ${estadoServidor.players.online}/${estadoServidor.players.max}`,
        inline: true,
      },
      {
        name: "Versión",
        value: `:pick: ${estadoServidor.version}`,
        inline: true,
      },
      {
        name: "Estado",
        value: "🌐 En linea",
        inline: true,
      },
    ];
  } else {
    embedDescripcion = `La dirección IP del servidor es: __${ip}__`;

    embedFields = {
      name: "🌐",
      value: "Fuera de linea",
    };
  }

  const embed = new EmbedBuilder()
    .setTitle(nombre)
    .setDescription(embedDescripcion)
    .addFields(embedFields)
    .setColor("#fc0453")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/1032516925617614878/1160340866930577438/logo.png?ex=65344ea4&is=6521d9a4&hm=3dbaf1994fee3faaeca5af169582308d30826df348dba4d3aa45a4a983bc41d3&",
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/1032516925617614878/1034170244870180965/separador_normal.png",
    );
  message.reply({ embeds: [embed] });
}
