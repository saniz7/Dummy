#!/usr/bin/env bash

generateArtifacts() {
  printHeadline "Generating basic configs" "U1F913"

  printItalics "Generating crypto material for Orderer" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-orderer.yaml" "peerOrganizations/orderer.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for patient" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-patient.yaml" "peerOrganizations/patient.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for doctor" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-doctor.yaml" "peerOrganizations/doctor.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for pharmacy" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-pharmacy.yaml" "peerOrganizations/pharmacy.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for lab" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-lab.yaml" "peerOrganizations/lab.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for insurance" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-insurance.yaml" "peerOrganizations/insurance.healthcare.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating genesis block for group group1" "U1F3E0"
  genesisBlockCreate "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config" "Group1Genesis"

  # Create directory for chaincode packages to avoid permission errors on linux
  mkdir -p "$FABLO_NETWORK_ROOT/fabric-config/chaincode-packages"
}

startNetwork() {
  printHeadline "Starting network" "U1F680"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose up -d)
  sleep 4
}

generateChannelsArtifacts() {
  printHeadline "Generating config for 'main-channel1'" "U1F913"
  createChannelTx "main-channel1" "$FABLO_NETWORK_ROOT/fabric-config" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config/config"
}

installChannels() {
  printHeadline "Creating 'main-channel1' on patient/peer0" "U1F63B"
  docker exec -i cli.patient.healthcare.com bash -c "source scripts/channel_fns.sh; createChannelAndJoin 'main-channel1' 'patientMSP' 'peer0.patient.healthcare.com:7041' 'crypto/users/Admin@patient.healthcare.com/msp' 'orderer0.group1.orderer.healthcare.com:7030';"

  printItalics "Joining 'main-channel1' on  doctor/peer0" "U1F638"
  docker exec -i cli.doctor.healthcare.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoin 'main-channel1' 'doctorMSP' 'peer0.doctor.healthcare.com:7061' 'crypto/users/Admin@doctor.healthcare.com/msp' 'orderer0.group1.orderer.healthcare.com:7030';"
  printItalics "Joining 'main-channel1' on  pharmacy/peer0" "U1F638"
  docker exec -i cli.pharmacy.healthcare.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoin 'main-channel1' 'pharmacyMSP' 'peer0.pharmacy.healthcare.com:7081' 'crypto/users/Admin@pharmacy.healthcare.com/msp' 'orderer0.group1.orderer.healthcare.com:7030';"
  printItalics "Joining 'main-channel1' on  lab/peer0" "U1F638"
  docker exec -i cli.lab.healthcare.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoin 'main-channel1' 'labMSP' 'peer0.lab.healthcare.com:7101' 'crypto/users/Admin@lab.healthcare.com/msp' 'orderer0.group1.orderer.healthcare.com:7030';"
  printItalics "Joining 'main-channel1' on  insurance/peer0" "U1F638"
  docker exec -i cli.insurance.healthcare.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoin 'main-channel1' 'insuranceMSP' 'peer0.insurance.healthcare.com:7121' 'crypto/users/Admin@insurance.healthcare.com/msp' 'orderer0.group1.orderer.healthcare.com:7030';"
}

installChaincodes() {
  if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
    local version="0.0.3"
    printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
    chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
    chaincodePackage "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for patient" "U1F60E"
    chaincodeInstall "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" ""
    chaincodeApprove "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Installing 'chaincode1' for doctor" "U1F60E"
    chaincodeInstall "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "chaincode1" "$version" ""
    chaincodeApprove "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Installing 'chaincode1' for pharmacy" "U1F60E"
    chaincodeInstall "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "chaincode1" "$version" ""
    chaincodeApprove "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Installing 'chaincode1' for lab" "U1F60E"
    chaincodeInstall "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "chaincode1" "$version" ""
    chaincodeApprove "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Installing 'chaincode1' for insurance" "U1F60E"
    chaincodeInstall "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "chaincode1" "$version" ""
    chaincodeApprove "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printItalics "Committing chaincode 'chaincode1' on channel 'main-channel1' as 'patient'" "U1F618"
    chaincodeCommit "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" "peer0.patient.healthcare.com:7041,peer0.doctor.healthcare.com:7061,peer0.pharmacy.healthcare.com:7081,peer0.lab.healthcare.com:7101,peer0.insurance.healthcare.com:7121" "" ""
  else
    echo "Warning! Skipping chaincode 'chaincode1' installation. Chaincode directory is empty."
    echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
  fi

}

installChaincode() {
  local chaincodeName="$1"
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  local version="$2"
  if [ -z "$version" ]; then
    echo "Error: chaincode version is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
      printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
      chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
      chaincodePackage "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for patient" "U1F60E"
      chaincodeInstall "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" ""
      chaincodeApprove "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for doctor" "U1F60E"
      chaincodeInstall "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "chaincode1" "$version" ""
      chaincodeApprove "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for pharmacy" "U1F60E"
      chaincodeInstall "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "chaincode1" "$version" ""
      chaincodeApprove "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for lab" "U1F60E"
      chaincodeInstall "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "chaincode1" "$version" ""
      chaincodeApprove "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for insurance" "U1F60E"
      chaincodeInstall "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "chaincode1" "$version" ""
      chaincodeApprove "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printItalics "Committing chaincode 'chaincode1' on channel 'main-channel1' as 'patient'" "U1F618"
      chaincodeCommit "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" "peer0.patient.healthcare.com:7041,peer0.doctor.healthcare.com:7061,peer0.pharmacy.healthcare.com:7081,peer0.lab.healthcare.com:7101,peer0.insurance.healthcare.com:7121" "" ""

    else
      echo "Warning! Skipping chaincode 'chaincode1' install. Chaincode directory is empty."
      echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
    fi
  fi
}

runDevModeChaincode() {
  local chaincodeName=$1
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    local version="0.0.3"
    printHeadline "Approving 'chaincode1' for patient (dev mode)" "U1F60E"
    chaincodeApprove "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for doctor (dev mode)" "U1F60E"
    chaincodeApprove "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for pharmacy (dev mode)" "U1F60E"
    chaincodeApprove "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for lab (dev mode)" "U1F60E"
    chaincodeApprove "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for insurance (dev mode)" "U1F60E"
    chaincodeApprove "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
    printItalics "Committing chaincode 'chaincode1' on channel 'main-channel1' as 'patient' (dev mode)" "U1F618"
    chaincodeCommit "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "0.0.3" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" "peer0.patient.healthcare.com:7041,peer0.doctor.healthcare.com:7061,peer0.pharmacy.healthcare.com:7081,peer0.lab.healthcare.com:7101,peer0.insurance.healthcare.com:7121" "" ""

  fi
}

upgradeChaincode() {
  local chaincodeName="$1"
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  local version="$2"
  if [ -z "$version" ]; then
    echo "Error: chaincode version is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
      printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
      chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
      chaincodePackage "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for patient" "U1F60E"
      chaincodeInstall "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "chaincode1" "$version" ""
      chaincodeApprove "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for doctor" "U1F60E"
      chaincodeInstall "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "chaincode1" "$version" ""
      chaincodeApprove "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for pharmacy" "U1F60E"
      chaincodeInstall "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "chaincode1" "$version" ""
      chaincodeApprove "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for lab" "U1F60E"
      chaincodeInstall "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "chaincode1" "$version" ""
      chaincodeApprove "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printHeadline "Installing 'chaincode1' for insurance" "U1F60E"
      chaincodeInstall "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "chaincode1" "$version" ""
      chaincodeApprove "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" ""
      printItalics "Committing chaincode 'chaincode1' on channel 'main-channel1' as 'patient'" "U1F618"
      chaincodeCommit "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041" "main-channel1" "chaincode1" "$version" "orderer0.group1.orderer.healthcare.com:7030" "" "false" "" "peer0.patient.healthcare.com:7041,peer0.doctor.healthcare.com:7061,peer0.pharmacy.healthcare.com:7081,peer0.lab.healthcare.com:7101,peer0.insurance.healthcare.com:7121" "" ""

    else
      echo "Warning! Skipping chaincode 'chaincode1' upgrade. Chaincode directory is empty."
      echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
    fi
  fi
}

notifyOrgsAboutChannels() {
  printHeadline "Creating new channel config blocks" "U1F537"
  createNewChannelUpdateTx "main-channel1" "patientMSP" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "main-channel1" "doctorMSP" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "main-channel1" "pharmacyMSP" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "main-channel1" "labMSP" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "main-channel1" "insuranceMSP" "MainChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"

  printHeadline "Notyfing orgs about channels" "U1F4E2"
  notifyOrgAboutNewChannel "main-channel1" "patientMSP" "cli.patient.healthcare.com" "peer0.patient.healthcare.com" "orderer0.group1.orderer.healthcare.com:7030"
  notifyOrgAboutNewChannel "main-channel1" "doctorMSP" "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com" "orderer0.group1.orderer.healthcare.com:7030"
  notifyOrgAboutNewChannel "main-channel1" "pharmacyMSP" "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com" "orderer0.group1.orderer.healthcare.com:7030"
  notifyOrgAboutNewChannel "main-channel1" "labMSP" "cli.lab.healthcare.com" "peer0.lab.healthcare.com" "orderer0.group1.orderer.healthcare.com:7030"
  notifyOrgAboutNewChannel "main-channel1" "insuranceMSP" "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com" "orderer0.group1.orderer.healthcare.com:7030"

  printHeadline "Deleting new channel config blocks" "U1F52A"
  deleteNewChannelUpdateTx "main-channel1" "patientMSP" "cli.patient.healthcare.com"
  deleteNewChannelUpdateTx "main-channel1" "doctorMSP" "cli.doctor.healthcare.com"
  deleteNewChannelUpdateTx "main-channel1" "pharmacyMSP" "cli.pharmacy.healthcare.com"
  deleteNewChannelUpdateTx "main-channel1" "labMSP" "cli.lab.healthcare.com"
  deleteNewChannelUpdateTx "main-channel1" "insuranceMSP" "cli.insurance.healthcare.com"
}

printStartSuccessInfo() {
  printHeadline "Done! Enjoy your fresh network" "U1F984"
}

stopNetwork() {
  printHeadline "Stopping network" "U1F68F"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose stop)
  sleep 4
}

networkDown() {
  printHeadline "Destroying network" "U1F916"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose down)

  printf "\nRemoving chaincode containers & images... \U1F5D1 \n"
  for container in $(docker ps -a | grep "dev-peer0.patient.healthcare.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.patient.healthcare.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.doctor.healthcare.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.doctor.healthcare.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.pharmacy.healthcare.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.pharmacy.healthcare.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.lab.healthcare.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.lab.healthcare.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.insurance.healthcare.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.insurance.healthcare.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done

  printf "\nRemoving generated configs... \U1F5D1 \n"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/config"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/crypto-config"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/chaincode-packages"

  printHeadline "Done! Network was purged" "U1F5D1"
}
