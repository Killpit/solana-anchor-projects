const anchor = require("@project-serum/anchor");
const provider = anchor.AnchorProvider.env();

async function main() {
const idl = JSON.parse(
    require("fs").readFileSync("./target/idl/gm.json", "utf8")
);

const programId = new anchor.web3.publicKey("J4WxumN8vrUrK3VWBfxvn7taV35q8Kd43uxTBSakUHeE");

const program = new anchor.Program(idl, programId);

const gmAccount = anchor.web3.Keypair.generate();
const name = 'Joakim'

let tx = await program.rpc.execute(name, {
    accounts: {
        gmAccount: gmAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemInstruction.programId
    },
    options: { commitment: "confirmed"},
    signers: [gmAccount]
});

const storedName = await program.account.greetingAccount.fetch(gmAccount.publicKey);
console.log(storedName.name);

}

main().then(() => {
    console.log("done");
})