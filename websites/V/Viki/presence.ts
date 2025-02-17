const presence = new Presence({
    clientId: "614387676467953674"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
  });

let title: HTMLInputElement, video: HTMLVideoElement;

const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  // Get the video
  video = document.querySelector("video.vjs-tech");

  if (!video) {
    const presenceData: PresenceData = {
      largeImageKey: "viki"
    };

    presenceData.startTimestamp = browsingTimestamp;

    if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname === "/"
    ) {
      presenceData.details = "Browsing through";
      presenceData.smallImageKey = "reading";
      presenceData.state = "the main page";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/explore") &&
      document.URL.includes("genre=")
    ) {
      title = document.querySelector(
        "#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong"
      );

      presenceData.details = "Browsing through genre:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/explore") &&
      document.URL.includes("country=")
    ) {
      title = document.querySelector(
        "#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > strong"
      );

      presenceData.details = "Browsing through country:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/explore") &&
      document.URL.includes("program=")
    ) {
      title = document.querySelector(
        "#pjaxify-container > div.container.explore-content > div.row > div > div.clearfix.section > div.explore-page-description > span:nth-child(3) > strong"
      );

      presenceData.details = "Browsing through";
      presenceData.smallImageKey = "reading";
      presenceData.state = `schedules: ${title.textContent}`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/explore")
    ) {
      presenceData.details = "Browsing through";
      presenceData.smallImageKey = "reading";
      presenceData.state = "all shows";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/collections/") &&
      document.location.pathname.includes("/fan")
    ) {
      presenceData.details = "Browsing through";
      presenceData.smallImageKey = "reading";
      presenceData.state = "fan-made collections";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/collections/") &&
      document.location.pathname.includes("/viki")
    ) {
      presenceData.details = "Browsing through";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Viki-made collections";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/collections/")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > div.main-container > div > div.row > div.col.s12.m12.l8 > div.card.card-highlight > div > h2"
      );

      presenceData.details = "Browsing the collection:";
      presenceData.smallImageKey = "reading";

      if (title) presenceData.state = title.textContent;
      else {
        presenceData.state = document.querySelector(
          "body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1"
        ).textContent;
      }
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/partners")
    ) {
      presenceData.details = "Viewing the partner page";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/networks")
    ) {
      presenceData.details = "Viewing the networks page";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/advertise")
    ) {
      presenceData.details = "Viewing the advertisers page";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/press")
    ) {
      presenceData.details = "Viewing the press center";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/overview")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a"
      );

      presenceData.details = "Viewing the profile of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/about")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div.col.s12.l8.profile-header-main > div > div > div.media-body > a"
      );

      presenceData.details = "Viewing the about of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = `${title.textContent}'s profile`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/badges")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing the badges of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("contributions")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing the contributions";
      presenceData.smallImageKey = "reading";
      presenceData.state = `of: ${title.textContent}`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/reviews")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing the reviews by:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/collections")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing the collections by:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/connection")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing the connections";
      presenceData.smallImageKey = "reading";
      presenceData.state = `of: ${title.textContent}`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/users/") &&
      document.location.pathname.includes("/following")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > div > div > div > div.media > div.media-body > a"
      );

      presenceData.details = "Viewing all the things";
      presenceData.smallImageKey = "reading";
      presenceData.state = `${title.textContent} follows`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/about")
    ) {
      presenceData.details = "Viewing the about page";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/tv-guide")
    ) {
      presenceData.details = "Viewing the TV Guide";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/celebrities/") &&
      document.URL.includes("-works")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1"
      );

      presenceData.details = "Viewing the works of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/celebrities/") &&
      document.URL.includes("-honor")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1"
      );

      presenceData.details = "Viewing the awards of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/celebrities/")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > div.main-container > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1"
      );

      presenceData.details = "Viewing the celeb profile";
      presenceData.smallImageKey = "reading";
      presenceData.state = `of: ${title.textContent}`;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/genres/")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div.container > div > div.col.s12.m12.l7 > h1"
      );

      presenceData.details = "Browsing through genre:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/genres")
    ) {
      presenceData.details = "Browsing through genres";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/tagged/news")
    ) {
      presenceData.details = "Browsing the Viki blogs";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Reading latest news";
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/tagged/product")
    ) {
      presenceData.details = "Browsing the Viki blogs";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Reading latest products";
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/tagged/engineering")
    ) {
      presenceData.details = "Browsing the Viki blogs";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Reading latest engineering";
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/tagged/qc-rewards")
    ) {
      presenceData.details = "Browsing the Viki blogs";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Reading latest qc-rewards";
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/about")
    ) {
      presenceData.details = "Viewing the about page";
      presenceData.smallImageKey = "reading";
      delete presenceData.state;
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/@")
    ) {
      title = document.querySelector("div.u-flex1 h1.ui-h2.hero-title");

      presenceData.details = "Viewing the profile page of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/") &&
      document.location.pathname.includes("-")
    ) {
      title = document.querySelector("h1 > strong");

      presenceData.details = "Reading blog post:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/search")
    ) {
      title = document.querySelector<HTMLInputElement>(
        "div > div.container.u-maxWidth640.u-marginTop40 > form > input"
      );

      presenceData.details = "Searching for:";
      presenceData.smallImageKey = "search";
      presenceData.state = title.value;
    } else if (
      document.location.hostname === "blog.viki.com" &&
      document.location.pathname.includes("/")
    ) {
      presenceData.details = "Browsing through the";
      presenceData.smallImageKey = "reading";
      presenceData.state = "main blog page";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/apps")
    ) {
      presenceData.details = "Viewing the";
      presenceData.smallImageKey = "reading";
      presenceData.state = "Viki applications";
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/search")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > header > div > h1 > q"
      );

      presenceData.details = "Searching for:";
      presenceData.smallImageKey = "search";
      presenceData.state = title.textContent;
    } else if (document.location.hostname === "support.viki.com") {
      presenceData.details = "Viki Support page";
      delete presenceData.smallImageKey;
      delete presenceData.state;
    } else if (document.location.hostname === "contribute.viki.com") {
      presenceData.details = "Viki Contribution page";
      delete presenceData.smallImageKey;
      delete presenceData.state;
    } else if (
      document.location.hostname === "www.viki.com" &&
      document.location.pathname.includes("/tv/")
    ) {
      title = document.querySelector(
        "body > div.page-wrapper > div.main-container > div.container > div:nth-child(2) > div > div.card.billboard > div > div.col.s12.l4.m4.billboard-meta > h1"
      );

      presenceData.details = "Browsing for episodes of:";
      presenceData.smallImageKey = "reading";
      presenceData.state = title.textContent;
    } else presence.setActivity();
  }

  // Check if it can find the video
  if (video && !isNaN(video.duration)) {
    const timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      ),
      presenceData: PresenceData = {
        details: "",
        state: "",
        largeImageKey: "viki",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play,
        startTimestamp: timestamps[0],
        endTimestamp: timestamps[1]
      };

    presenceData.details = document.querySelector(
      ".vkp-pos-container-title"
    ).textContent;
    presenceData.state =
      document.querySelector("p.vkp-pos-subtitle").textContent;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    presence.setActivity(presenceData, !video.paused);
  }
});
