const {
  Client,
  GatewayIntentBits,
  Partials,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  StringSelectMenuOptionBuilder,
  MessageFlags,
} = require("discord.js");
const config = require("./config.json");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.GuildMember],
});

const activeTickets = {};

client.once("ready", async () => {
  console.log(`✅ Bot is online! Logged in as ${client.user.tag}`);
  console.log(`Bot is in ${client.guilds.cache.size} server(s)`);

  client.user.setPresence({
    activities: [
      {
        name: "Build For Nova Roleplay",
        type: ActivityType.Playing,
      },
    ],
    status: "idle",
  });


});

client.on("guildMemberAdd", async (member) => {
  if (
    config.welcomeChannelId &&
    config.welcomeChannelId !== "WELCOME_CHANNEL_ID_HERE"
  ) {
    const welcomeChannel = member.guild.channels.cache.get(
      config.welcomeChannelId,
    );
    if (welcomeChannel) {
      const welcomeEmbed = new EmbedBuilder()
        .setColor("#39FF14")
        .setTitle("Welcome to the City!")
        .setDescription(
          `🚨 Welcome to Nova Roleplay, <@${member.id}>! 🚨\nYou’ve just stepped into a world where every decision shapes your story.\n\n📜 Please read ⁠<#1479374865436901418> carefully\n\n🎫 Need help? Open a ticket in ⁠<#1501905363853643817>\n\nBuild your empire, protect your crew, or enforce the law —\nYour journey in Los Santos begins now. \n\n🌆 Stay in character. Respect others. Create legendary stories.`,
        )
        .setThumbnail(
          member.displayAvatarURL({ dynamic: true, size: 512 }),
        )
        .setImage("https://i.postimg.cc/zDKvKHqm/nova.gif");
      welcomeChannel.send({
        content: `<@${member.id}>`,
        embeds: [welcomeEmbed],
      });
    }
  }
});

client.on("interactionCreate", async (intearction) => {
  if (!intearction.isStringSelectMenu()) {
    if (intearction.customId === "membership_select") {
      const selectedMembership = intearction.values[0];
      const image = config.membershipImages[selectedMembership] || null;
      const embed = new EmbedBuilder()
        .setImage(image)
        .setTitle(`You selected: ${selectedMembership}`);
      await intearction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    }
  }
  if (intearction.isButton()) {
    const membershipId = intearction.customId.replace("membership_", "");
    const image = config.membershipImages[membershipId] || null;
    const embed = new EmbedBuilder()
      .setImage(image)
      .setTitle(`You selected: ${membershipId}`);
    await intearction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (
    message.content === "!testwelcome" &&
    message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    client.emit("guildMemberAdd", message.member);
    return;
  }

  if (
    message.content === "!membership" &&
    message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    const conatiner = new ContainerBuilder()
      .setAccentColor(0xccff00)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent("## Nova Membership"),
      )
      .addSeparatorComponents(new SeparatorBuilder())
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "Explore the membership options available for Nova Roleplay, where you can choose and purchase the plan that fits you best.",
        ),
      )
      .addSeparatorComponents(new SeparatorBuilder())
      .addActionRowComponents(
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("membership_bronze")
            .setEmoji("<:bronze:1506921190755794974> ")
            .setLabel("Bronze")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_silver")
            .setEmoji("<:silver:1506921127900086432> ")
            .setLabel("Silver")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_gold")
            .setEmoji("<:gold:1506921226889859092> ")
            .setLabel("Gold")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_platinum")
            .setEmoji("<:platinum:1506921161274163251> ")
            .setLabel("Platinum")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_diamond")
            .setEmoji("<a:diamond:1506921302152187975> ")
            .setLabel("Diamond")
            .setStyle(ButtonStyle.Secondary),
        ),
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("membership_supporter")
            .setEmoji("<:supporter:1506920957397303399> ")
            .setLabel("Supporter")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_contributor")
            .setEmoji("<:contributor:1506921263518453851> ")
            .setLabel("Contributor")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("membership_gang")
            .setEmoji("<:gang:1506921061894197258> ")
            .setLabel("Gang")
            .setStyle(ButtonStyle.Secondary),
          // new StringSelectMenuBuilder()
          //   .setPlaceholder("Select a membership")
          //   .setCustomId("membership_select")
          //   .addOptions(
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Bronze")
          //       .setValue("bronze"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Silver")
          //       .setValue("silver"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Gold")
          //       .setValue("gold"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Platinum")
          //       .setValue("platinum"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Diamond")
          //       .setValue("diamond"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Supporter")
          //       .setValue("supporter"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Contributor")
          //       .setValue("contributor"),
          //     new StringSelectMenuOptionBuilder()
          //       .setLabel("Gang")
          //       .setValue("gang"),
          //   ),
        ),
      );

    message.channel.send({
      components: [conatiner],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  if (
    message.content === "!setup" &&
    message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("application_select")
      .setPlaceholder("Select an application form")
      .addOptions(
        Object.keys(config.forms).map((formKey) => ({
          label: config.forms[formKey].label,
          value: formKey,
        })),
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const setupEmbed = new EmbedBuilder()
      .setColor("#39FF14")
      .setTitle("📝 Application Center")
      .setDescription(
        "Select the department or role you want to apply for from the menu below.",
      )
      .setThumbnail(
        "https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/ezgif-3eef294940d4524b.gif",
      )
      .setImage(
        "https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/Untitled-3.png",
      );

    await message.channel.send({
      embeds: [setupEmbed],
      components: [row],
    });
    return;
  }

  if (activeTickets[message.channel.id]) {
    const ticket = activeTickets[message.channel.id];

    if (message.author.id !== ticket.userId) return;

    ticket.answers.push(message.content);
    ticket.currentQuestionIndex++;

    const formData = config.forms[ticket.formType];

    if (ticket.currentQuestionIndex < formData.questions.length) {
      const qEmbed = new EmbedBuilder()
        .setColor("#39FF14")
        .setTitle(`Question ${ticket.currentQuestionIndex + 1}`)
        .setDescription(formData.questions[ticket.currentQuestionIndex]);
      await message.channel.send({ embeds: [qEmbed] });
    } else {
      const successEmbed = new EmbedBuilder()
        .setColor("#39FF14")
        .setTitle("✅ Application Submitted")
        .setDescription(
          "Your application has been submitted successfully! This channel will be deleted in a few seconds.",
        )
        .setThumbnail(message.author.displayAvatarURL());
      await message.channel.send({
        content: `<@${message.author.id}>`,
        embeds: [successEmbed],
      });

      const member = await message.guild.members
        .fetch(ticket.userId)
        .catch(() => null);
      if (member) {
        await member.roles.add(formData.applicantRoleId).catch(console.error);
      }

      const reviewChannel = message.guild.channels.cache.get(
        formData.reviewChannelId,
      );
      if (reviewChannel) {
        const embed = new EmbedBuilder()
          .setTitle(`New ${formData.label} Application`)
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL(),
          })
          .setColor("#FFA500")
          .setFooter({ text: `User ID: ${message.author.id}` })
          .setThumbnail(message.author.displayAvatarURL())
          .setTimestamp();

        formData.questions.forEach((q, i) => {
          const answer = ticket.answers[i];
          const safeAnswer =
            answer.length > 1000 ? answer.substring(0, 1000) + "..." : answer;
          embed.addFields({ name: `Q: ${q}`, value: `A: ${safeAnswer}` });
        });

        const actionRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_${ticket.formType}_${message.author.id}`)
            .setLabel("Accept")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`reject_${ticket.formType}_${message.author.id}`)
            .setLabel("Reject")
            .setStyle(ButtonStyle.Danger),
        );

        await reviewChannel.send({
          content: `<@${message.author.id}>`,
          embeds: [embed],
          components: [actionRow],
        });
      }

      delete activeTickets[message.channel.id];
      setTimeout(() => {
        message.channel?.delete().catch(console.error);
      }, 5000);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "application_select") {
      const formType = interaction.values[0];
      const formData = config.forms[formType];

      const resetSelectMenu = new StringSelectMenuBuilder()
        .setCustomId("application_select")
        .setPlaceholder("Select an application form")
        .addOptions(
          Object.keys(config.forms).map((formKey) => ({
            label: config.forms[formKey].label,
            value: formKey,
          })),
        );
      await interaction.message.edit({
        components: [new ActionRowBuilder().addComponents(resetSelectMenu)],
      });

      const hasActiveTicket = Object.values(activeTickets).some(
        (t) => t.userId === interaction.user.id,
      );
      if (hasActiveTicket) {
        const errorEmbed = new EmbedBuilder()
          .setColor("#39FF14")
          .setDescription("You already have an active application ticket!");
        return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }

      const channelName = `app-${interaction.user.username}`;
      const ticketChannel = await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: client.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });

      activeTickets[ticketChannel.id] = {
        formType,
        userId: interaction.user.id,
        currentQuestionIndex: 0,
        answers: [],
      };

      const createdEmbed = new EmbedBuilder()
        .setColor("#39FF14")
        .setDescription(
          `Your application ticket has been created: <#${ticketChannel.id}>`,
        );
      await interaction.reply({ embeds: [createdEmbed], ephemeral: true });

      const welcomeEmbed = new EmbedBuilder()
        .setColor("#39FF14")
        .setTitle(`Welcome to your ${formData.label}`)
        .setDescription(
          `Hello <@${interaction.user.id}>, welcome to your ${formData.label} process.\nPlease answer each question one by one.\n\n**Question 1:** ${formData.questions[0]}`,
        );
      await ticketChannel.send({
        content: `<@${interaction.user.id}>`,
        embeds: [welcomeEmbed],
      });
    }
  }

  if (interaction.isButton()) {
    if (
      interaction.customId.startsWith("accept_") ||
      interaction.customId.startsWith("reject_")
    ) {
      const parts = interaction.customId.split("_");
      const action = parts[0];
      const formType = parts[1];
      const targetUserId = parts[2];
      const formData = config.forms[formType];

      if (
        !interaction.member.roles.cache.has(formData.reviewerRoleId) &&
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator,
        )
      ) {
        const permEmbed = new EmbedBuilder()
          .setColor("#39FF14")
          .setDescription(
            "You do not have permission to review this application.",
          );
        return interaction.reply({ embeds: [permEmbed], ephemeral: true });
      }

      const member = await interaction.guild.members
        .fetch(targetUserId)
        .catch(() => null);

      if (member) {
        await member.roles
          .remove(formData.applicantRoleId)
          .catch(console.error);

        if (action === "accept" && formData.acceptedRoleId) {
          await member.roles.add(formData.acceptedRoleId).catch(console.error);
        }

        const statusMessage =
          action === "accept" ? "accepted 🎉" : "rejected 😔";
        const dmEmbed = new EmbedBuilder()
          .setColor(action === "accept" ? "#00FF00" : "#FF0000")
          .setTitle("Application Update")
          .setDescription(
            `Hello! Your **${formData.label}** has been **${statusMessage}** by <@${interaction.user.id}>.`,
          )
          .setThumbnail(member.user.displayAvatarURL());
        await member
          .send({ content: `<@${targetUserId}>`, embeds: [dmEmbed] })
          .catch(() => console.error(`Could not DM user ${targetUserId}`));
      }

      const oldEmbed = interaction.message.embeds[0];
      const newEmbed = EmbedBuilder.from(oldEmbed)
        .setColor(action === "accept" ? "#00FF00" : "#FF0000")
        .setTitle(
          `${formData.label} - ${action === "accept" ? "ACCEPTED" : "REJECTED"}`,
        );

      await interaction.update({
        content: `<@${targetUserId}>`,
        embeds: [newEmbed],
        components: [],
      });

      const replyStatus = action === "accept" ? "Accepted" : "Rejected";
      const followupEmbed = new EmbedBuilder()
        .setColor(action === "accept" ? "#00FF00" : "#FF0000")
        .setDescription(
          `Application for <@${targetUserId}> has been marked as **${replyStatus}**.`,
        );
      if (member) followupEmbed.setThumbnail(member.user.displayAvatarURL());
      await interaction.followUp({
        content: `<@${targetUserId}>`,
        embeds: [followupEmbed],
        ephemeral: true,
      });
      const formImage =
        action === "accept"
          ? config.approvedImage
          : config.rejectedImage || null;
      if (formData.resultChannelId) {
        const resultChannel = interaction.guild.channels.cache.get(
          formData.resultChannelId,
        );
        if (resultChannel) {
          const isAccepted = action === "accept";

          const resultLogEmbed = new EmbedBuilder()
            .setColor(isAccepted ? "#00FF00" : "#FF0000")
            .setTitle(`${formData.label} Result`)
            .setDescription(
              `**Applicant:** <@${targetUserId}>
**Status:** ${isAccepted ? "Accepted 🎉" : "Rejected 😔"}

${
  isAccepted
    ? "🎉 Congratulations! Your application has been selected and accepted. Welcome aboard!"
    : "😔 We are sorry, but your application was rejected. Please try again later."
}

**Reviewed by:** <@${interaction.user.id}>`,
            )
            .setThumbnail(member ? member.user.displayAvatarURL() : null)
            .setImage(formImage || null)
            .setTimestamp();
        }
      }
    }
  }
});

client.login(config.token);
