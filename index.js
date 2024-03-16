#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const https = require("https");

const getParentRepoUrl = (username, repository) => {
  return new Promise((resolve, reject) => {
    const token = execSync("echo $GITHUB_TOKEN").toString().trim();
    const headers = {
      "User-Agent": "GitHub-Parent-Fork-Info",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    const options = {
      hostname: "api.github.com",
      path: `/repos/${username}/${repository}`,
      method: "GET",
      headers,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          const parentRepoUrl = JSON.parse(data).parent.html_url;
          resolve(parentRepoUrl);
        } else {
          reject(
            new Error(
              `Failed to fetch parent repository URL: ${res.statusCode} ${res.statusMessage}`
            )
          );
        }
      });
    });

    req.on("error", (error) => {
      reject(
        new Error(`Failed to fetch parent repository URL: ${error.message}`)
      );
    });

    req.end();
  });
};

const syncParentFork = async () => {
  if (!fs.existsSync(".git")) {
    console.error(
      "Error: This script must be executed within a git repository."
    );
    process.exit(1);
  }

  try {
    execSync("git remote get-url upstream").toString().trim();
  } catch (error) {
    // set upstream
    const username = execSync("git remote get-url origin")
      .toString()
      .trim()
      .split("/")[3];

    const repository = execSync("git remote get-url origin")
      .toString()
      .trim()
      .split("/")[4]
      .split(".git")[0];
    const parentRepoUrl = await getParentRepoUrl(username, repository);
    console.log("Setting upstream to", parentRepoUrl);
    execSync(`git remote add upstream ${parentRepoUrl}`);
  }

  try {
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();

    console.log("Syncing parent fork...");

    execSync("git fetch upstream");
    execSync(`git checkout ${currentBranch}`);
    execSync(`git merge upstream/${currentBranch}`);

    execSync(`git push origin ${currentBranch}`);

    console.log("Parent fork synced successfully.");
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
};

syncParentFork();
