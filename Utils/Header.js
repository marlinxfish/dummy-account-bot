const chalk = require("chalk");
const ora = require("ora");

const skull = `
       .                                                      .
        .n                   .                 .                  n.
  .   .dP                  dP                   9b                 9b.    .
 4    qXb         .       dX                     Xb       .        dXp     t
dX.    9Xb      .dXb    __                         __    dXb.     dXP     .Xb
9XXb._       _.dXXXXb dXXXXbo.                 .odXXXXb dXXXXb._       _.dXXP
 9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.           .oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP
  \`9XXXXXXXXXXXXXXXXXXXXX'~   ~\`OOO8b   d8OOO'~   ~\`XXXXXXXXXXXXXXXXXXXXXP'
    \`9XXXXXXXXXXXP' \`9XX'   DIE    \`98v8P'  HUMAN   \`XXP' \`9XXXXXXXXXXXP'
        ~~~~~~~       9X.          .db|db.          .XP       ~~~~~~~
                        )b.  .dbo.dP'\\v'\\9b.odb.  .dX(
                      ,dXXXXXXXXXXXb     dXXXXXXXXXXXb.
                     dXXXXXXXXXXXP'   .   \`9XXXXXXXXXXXb
                    dXXXXXXXXXXXXb   d|b   dXXXXXXXXXXXXb
                    9XXb'   \`XXXXXb.dX|Xb.dXXXXX'   \`dXXP
                     \`'      9XXXXXX(   )XXXXXXP      \`'
                              XXXX X.\`v'.X XXXX
                              XP^X'\\b   d'\\X^XX
                              X. 9  \`   '  P )X
                              \`b  \`       '  d'
                               \`             '
`;

function displayHeader(data, callback) {
  const spinner = ora("Loading...").start();

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = "Loading completed!";

    setTimeout(() => {
      spinner.stop();

      console.clear(); // Membersihkan konsol
      console.log(chalk.red(skull)); // Menampilkan tengkorak dengan warna merah
      console.log(chalk.yellow("                Masih Muda Masih Aja Pakai Bot Dasar Pemalas"));
      console.log(chalk.gray("=".repeat(50)));
      console.log(chalk.blue(data));
      console.log(chalk.green("Created By Marlin"));
      console.log(chalk.magenta("Komunitas Ternak Lele"));
      console.log(chalk.gray("=".repeat(50)));

      // Memanggil callback setelah spinner berhenti
      if (callback) callback();
    }, 2000);
  }, 1000);
}

module.exports = displayHeader;
