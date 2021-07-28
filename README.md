# Polkadot-K8s-Payouts

A tool to deploy an utility that automatically claims your Kusama/Polkadot validator rewards in a Kubernetes cluster.  
This tool leverages on the official [polkadot-payout](https://github.com/w3f/polkadot-payouts) application from Web3 Foundation.

## My on-chain Identity

ALESSIO (Validator on Polkadot): 16cdSZUq7kxq6mtoVMWmYXo62FnNGT9jzWjVRUg87CpL9pxP  
ALESSIO (Validator on Kusama): GaK38GT7LmgCpRSTRdDC2LeiMaV9TJmx8NmQcb9L3cJ3fyX

![identity](assets/identity.png)

## Related Projects

- https://github.com/ironoa/polkadot-k8s-monitor: this other project will help you deploy a monitoring cluster for substrate based nodes. You can think to deploy the payout tool in this cluster as an addon, or else in an another Kubernetes cluster you prefer.

## Table Of Contents

* [Requirements](#requirements)
* [Polkadot Payouts](#polkadot-payouts)
* [Claimer Account](#claimer-account)
* [How To Configure the Application](#how-to-configure-the-application)
* [How To Deploy it Locally](#how-to-deploy-it-locally)
* [How To Deploy it in Production](#how-to-deploy-it-in-production)
* [Future Developments](#future-developments)

## Requirements
* kind (if you want to deploy it locally): https://kind.sigs.k8s.io/docs/user/quick-start/#installation
* kind requires Docker: https://docs.docker.com/get-docker/
* A Kubernetes cluster (if you don't want to use kind)
* kubectl: https://kubernetes.io/docs/tasks/tools/
* helmfile: https://github.com/roboll/helmfile#installation => brew install helmfile (on macOS)
* A founded Claimer Account (ideally, one for each network you want to work with)

## Polkadot Payouts
This project is particularly suited to be working in synergy with the [polkadot-k8s-monitor](https://github.com/ironoa/polkadot-k8s-monitor), and his goal is to automate the [payout claims](https://wiki.polkadot.network/docs/learn-simple-payouts) for the validators you are running. You can use this tool even if you are nominating your favourite validators and you want to be sure to not miss any payout. It will submit the payoutStakers extrinsics for you !

## Claimer Account

This is a hot wallet you deploy onto the cluster. Its job is to sign and send the payoutStakers extrinsics for your monitored accounts. To do so, it is obviusly gonna pay some negligible fees for the transactions submissions. For this reason, that wallet should be founded ( just a few euros and then you can forget about it ) 

### Security

You should create a dedicated wallet for this scope (ideally, one for each network you want to work with), and then found it with no more than the equivalent of few euros. For this reason, even though this is an hot wallet, there are no risks on deploying it

## How To Configure the Application

You can find a sample of the nodes related yaml config file [here](config/validators.sample.yaml).  

```yaml
validatorsPolkadot:
- name: ALESSIO
  stashAccount: 16cdSZUq7kxq6mtoVMWmYXo62FnNGT9jzWjVRUg87CpL9pxP
validatorsKusama: 
- name: ALESSIO-0
  stashAccount: GaK38GT7LmgCpRSTRdDC2LeiMaV9TJmx8NmQcb9L3cJ3fyX
```

You can find a sample of the environment variables related file [file](config/env.sample.sh), meant to contain your secrets and your passwords:

```sh
export KUSAMA_CLAIMER_PASSWORD='yourPassword'
export POLKADOT_CLAIMER_WALLET=`{"address":"xx","encoded":"xx","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"name":"xx","whenCreated":xx}}`
```

Once you have set up the nodes and the secrets/passwords, you can focus on fine tuning the deployment (though default values are provided): [config](helmfile.d/config)

## How To Deploy it Locally
I'd reccomend to test first this approach 

```bash
git clone https://github.com/ironoa/polkadot-k8s-payouts.git
cd polkadot-k8s-payouts
cp config/env.sample.local.sh config/env.sh #create the default env config file
cp config/nodes.sample.yaml config/nodes.yaml #create the default nodes config file
#just the fist time

./scripts/deployLocal.sh
# just re trigger it to deploy configuration changes

#if you want to delete your local cluster
#./scripts/uninstallLocal.sh
```

## How To Deploy it in Production
First, connect yourself to your chosen kubernetes cluster.

```bash
git clone https://github.com/ironoa/polkadot-k8s-payouts.git 
cd polkadot-k8s-payouts
cp config/env.sample.complete.sh config/env.sh #create the default env config file
cp config/nodes.sample.yaml config/nodes.yaml #create the default nodes config file
#just the fist time

./scripts/deployProduction.sh
# just re trigger it to deploy configuration changes
```

## Helm Chart
The Helm Chart is also deployed [here](https://github.com/ironoa/helm-charts/tree/gh-pages)

```sh
helm repo add ironoa https://ironoa.github.io/helm-charts/
```

You can then run `helm search repo ironoa` to see the charts.

## How it will look like
![log](assets/log.png)

## Future Developments
- [ ] Improve the documentation
- [ ] Youtube tutorials 
