# Nova Roleplay Discord Bot

A customized, secure Discord bot built with `discord.js` v14 for Nova Roleplay. This bot manages server applications (such as Staff, PD, EMS, etc.), displays membership tiers, and provides a welcoming experience for new members.

## 🌟 Features

* **Application System:** Users can apply for various roles (Staff, PD, DOJ, EMS, PDM, Streamer, Gang). The bot creates a private ticket, asks them questions sequentially, and forwards the completed application to a review channel.
* **Review System:** Authorized staff can Accept or Reject applications using interactive buttons. The bot automatically handles role assignments and notifies the applicant via Direct Message.
* **Membership Tiers:** Interactive buttons allow members to explore different membership plans visually.
* **Welcome Messages:** Sends a beautifully formatted embedded message to a designated channel whenever a new member joins the server.

---

## 🛠️ Bot Commands

All commands are restricted to server **Administrators** to prevent abuse.

| Command | Description |
| :--- | :--- |
| `!setup` | Sends the "Application Center" menu into the channel. Users can select an application from the dropdown to begin their application process. |
| `!membership` | Displays a menu with buttons for different membership tiers (Bronze, Silver, Gold, etc.). Clicking a button shows the user an image of that membership. |
| `!testwelcome` | Simulates a user joining the server to test the welcome message and its formatting. |

---

## ⚙️ Configuration (`config.json`)

All customizable settings for the bot are located in `config.json`. 

* **`token`**: Your Discord Bot Token. *(Keep this secret!)*
* **`welcomeChannelId`**: The ID of the channel where welcome messages will be sent.
* **`membershipImages`**: Links to images for each membership tier.
* **`approvedImage` / `rejectedImage`**: Banners shown when an application is reviewed.
* **`forms`**: This section contains all the application forms. For each form, you can configure:
  * `applicantRoleId`: Role given temporarily while applying.
  * `acceptedRoleId`: Role given automatically if the application is accepted.
  * `reviewerRoleId`: The role required to accept/reject these applications.
  * `reviewChannelId`: Where the completed applications are sent for staff to review.
  * `resultChannelId`: Where public results are posted.
  * `questions`: The list of questions the bot will ask the applicant.

---

## 🚀 How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal in the bot's folder.
3. Install the required packages by running:
   ```bash
   npm install
   ```
4. Put your bot token in the `config.json` file.
5. Start the bot by running:
   ```bash
   node index.js
   ```

---

## 🔒 Security

This bot is entirely safe. It does not send any server data to external services. All ticket data is kept in the bot's temporary memory while active and cleared afterward. Command access and application reviews are strictly restricted by Discord permissions and role checks.
