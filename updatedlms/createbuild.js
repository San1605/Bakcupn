const { readFileSync, writeFile, copyFile,writeFileSync } = require("fs");

const file = "./src/microsoft-ADLogin.js";

const content = readFileSync(file, "utf8");

const newContent = content.replace(

  "http://localhost:3000",

  "https://ct-lms.azurewebsites.net"

);

writeFile(file, newContent, (err) => {

  if (err) console.log(err);

  else {

    const subProcess = require("child_process");

    subProcess.exec("npm run build", (err, stdout, stderr) => {

      if (err) {

        console.error(err);

        process.exit(1);

      } else {

        if (stdout) {

          copyFile("./web.config", "./build/web.config", (err) => {

            if (err) throw err;

            subProcess.exec("cd build & code .", (err, stdout, stderr) => {

              if (err) {

                console.error(err);

                process.exit(1);

              } else {

                if (stdout) {

                  console.log(stdout);

                }

                if (stderr) {

                  console.log(stderr);

                }

                const newAfterContent = content.replace(

                  "https://ct-lms.azurewebsites.net",

                  "http://localhost:3000"

                );

                writeFileSync(file, newAfterContent, () => {});

              }

            });

          });

        }

      }

    });

  }

});

