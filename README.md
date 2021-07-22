# polkadot-k8s-payouts

A tool to deploy an utily to to claim you Kusama/Polkadot validator rewards in a Kubernetes cluster. 

## My on-chain Identity

ALESSIO (Validator on Polkadot): 16cdSZUq7kxq6mtoVMWmYXo62FnNGT9jzWjVRUg87CpL9pxP  
ALESSIO (Validator on Kusama): GaK38GT7LmgCpRSTRdDC2LeiMaV9TJmx8NmQcb9L3cJ3fyX

![identity](assets/identity.png)

## How To Configure the Application

This is a typical configuration file to use the "Claim for a third party" feature:
```
logLevel: info
wsEndpoint: "wss://kusama-rpc.polkadot.io/"
claimsThirdParty:
  claimerKeystore:
    filePath: /path/to/validator-000/keystore
    passwordPath: /path/to/validator-000/keystore/password
  targets:
  - alias: validator-000
    validatorAddress: "<validator-000-stash-address>"
  - alias: validator-001
    validatorAddress: "<validator-001-stash-address>"  
```
You should define the RPC endpoint to use in the `wsEndpoint` field.