const presence = new Presence({
  clientId: "800651916345999360"
});

presence.on("UpdateData", () => {
  const route = document.location.hash.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (route.length === 1 || route[1] === "")
    presenceData.details = "Browsing the main page...";
  else if (route[1] === "docs") {
    [, , presenceData.smallImageKey] = route;
    presenceData.smallImageText = `${route[2].replace(/^[a-z]/i, c =>
      c.toUpperCase()
    )} - ${Number(route[3][0]) ? `v${route[3]}` : `${route[3]}`}`;
    if (route[4].startsWith("search?q=")) {
      presenceData.details = "Searching for:";
      presenceData.state = route[4].slice(9);
    } else if (route[4] === "general") {
      presenceData.details = "Viewing:";
      presenceData.state =
        route[5] === "faq"
          ? route[5].toUpperCase()
          : `${route[5].replace(/^[a-z]/i, c => c.toUpperCase())}`;
    } else {
      presenceData.details = `Looking for a${
        (route[5].split("?scrollTo=")[1] &&
          route[5].split("?scrollTo=")[1].startsWith("e-")) ||
        route[4] === "examples"
          ? "n"
          : ""
      } ${
        route[5].split("?scrollTo=")[1] &&
        route[5].split("?scrollTo=")[1].startsWith("e-")
          ? "event"
          : `${
              route[4].endsWith("s") && route[4] !== "class"
                ? route[4].substring(0, route[4].length - 1)
                : route[4].replace(/^[a-z]/i, c => c.toUpperCase())
            }`
      }`;
      presenceData.state = `${route[5].split("?scrollTo=")[0]}${
        route[5].split("?scrollTo=")[1]
          ? `#${
              route[5].split("?scrollTo=")[1][1] === "-"
                ? route[5].split("?scrollTo=")[1].slice(2)
                : route[5].split("?scrollTo=")[1]
            }`
          : ""
      }`;
    }
  }

  presence.setActivity(presenceData);
});
