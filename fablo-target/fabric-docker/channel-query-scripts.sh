#!/usr/bin/env bash

source "$FABLO_NETWORK_ROOT/fabric-docker/scripts/channel-query-functions.sh"

set -eu

channelQuery() {
  echo "-> Channel query: " + "$@"

  if [ "$#" -eq 1 ]; then
    printChannelsHelp

  elif [ "$1" = "list" ] && [ "$2" = "patient" ] && [ "$3" = "peer0" ]; then

    peerChannelList "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041"

  elif
    [ "$1" = "list" ] && [ "$2" = "doctor" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061"

  elif
    [ "$1" = "list" ] && [ "$2" = "pharmacy" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081"

  elif
    [ "$1" = "list" ] && [ "$2" = "lab" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101"

  elif
    [ "$1" = "list" ] && [ "$2" = "insurance" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121"

  elif

    [ "$1" = "getinfo" ] && [ "$2" = "main-channel1" ] && [ "$3" = "patient" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "main-channel1" "cli.patient.healthcare.com" "peer0.patient.healthcare.com:7041"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "main-channel1" ] && [ "$4" = "patient" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "main-channel1" "cli.patient.healthcare.com" "$TARGET_FILE" "peer0.patient.healthcare.com:7041"

  elif [ "$1" = "fetch" ] && [ "$3" = "main-channel1" ] && [ "$4" = "patient" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "main-channel1" "cli.patient.healthcare.com" "${BLOCK_NAME}" "peer0.patient.healthcare.com:7041" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "main-channel1" ] && [ "$3" = "doctor" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "main-channel1" "cli.doctor.healthcare.com" "peer0.doctor.healthcare.com:7061"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "main-channel1" ] && [ "$4" = "doctor" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "main-channel1" "cli.doctor.healthcare.com" "$TARGET_FILE" "peer0.doctor.healthcare.com:7061"

  elif [ "$1" = "fetch" ] && [ "$3" = "main-channel1" ] && [ "$4" = "doctor" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "main-channel1" "cli.doctor.healthcare.com" "${BLOCK_NAME}" "peer0.doctor.healthcare.com:7061" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "main-channel1" ] && [ "$3" = "pharmacy" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "main-channel1" "cli.pharmacy.healthcare.com" "peer0.pharmacy.healthcare.com:7081"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "main-channel1" ] && [ "$4" = "pharmacy" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "main-channel1" "cli.pharmacy.healthcare.com" "$TARGET_FILE" "peer0.pharmacy.healthcare.com:7081"

  elif [ "$1" = "fetch" ] && [ "$3" = "main-channel1" ] && [ "$4" = "pharmacy" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "main-channel1" "cli.pharmacy.healthcare.com" "${BLOCK_NAME}" "peer0.pharmacy.healthcare.com:7081" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "main-channel1" ] && [ "$3" = "lab" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "main-channel1" "cli.lab.healthcare.com" "peer0.lab.healthcare.com:7101"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "main-channel1" ] && [ "$4" = "lab" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "main-channel1" "cli.lab.healthcare.com" "$TARGET_FILE" "peer0.lab.healthcare.com:7101"

  elif [ "$1" = "fetch" ] && [ "$3" = "main-channel1" ] && [ "$4" = "lab" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "main-channel1" "cli.lab.healthcare.com" "${BLOCK_NAME}" "peer0.lab.healthcare.com:7101" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "main-channel1" ] && [ "$3" = "insurance" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "main-channel1" "cli.insurance.healthcare.com" "peer0.insurance.healthcare.com:7121"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "main-channel1" ] && [ "$4" = "insurance" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "main-channel1" "cli.insurance.healthcare.com" "$TARGET_FILE" "peer0.insurance.healthcare.com:7121"

  elif [ "$1" = "fetch" ] && [ "$3" = "main-channel1" ] && [ "$4" = "insurance" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "main-channel1" "cli.insurance.healthcare.com" "${BLOCK_NAME}" "peer0.insurance.healthcare.com:7121" "$TARGET_FILE"

  else

    echo "$@"
    echo "$1, $2, $3, $4, $5, $6, $7, $#"
    printChannelsHelp
  fi

}

printChannelsHelp() {
  echo "Channel management commands:"
  echo ""

  echo "fablo channel list patient peer0"
  echo -e "\t List channels on 'peer0' of 'patient'".
  echo ""

  echo "fablo channel list doctor peer0"
  echo -e "\t List channels on 'peer0' of 'doctor'".
  echo ""

  echo "fablo channel list pharmacy peer0"
  echo -e "\t List channels on 'peer0' of 'pharmacy'".
  echo ""

  echo "fablo channel list lab peer0"
  echo -e "\t List channels on 'peer0' of 'lab'".
  echo ""

  echo "fablo channel list insurance peer0"
  echo -e "\t List channels on 'peer0' of 'insurance'".
  echo ""

  echo "fablo channel getinfo main-channel1 patient peer0"
  echo -e "\t Get channel info on 'peer0' of 'patient'".
  echo ""
  echo "fablo channel fetch config main-channel1 patient peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'patient'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> main-channel1 patient peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'patient'".
  echo ""

  echo "fablo channel getinfo main-channel1 doctor peer0"
  echo -e "\t Get channel info on 'peer0' of 'doctor'".
  echo ""
  echo "fablo channel fetch config main-channel1 doctor peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'doctor'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> main-channel1 doctor peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'doctor'".
  echo ""

  echo "fablo channel getinfo main-channel1 pharmacy peer0"
  echo -e "\t Get channel info on 'peer0' of 'pharmacy'".
  echo ""
  echo "fablo channel fetch config main-channel1 pharmacy peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'pharmacy'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> main-channel1 pharmacy peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'pharmacy'".
  echo ""

  echo "fablo channel getinfo main-channel1 lab peer0"
  echo -e "\t Get channel info on 'peer0' of 'lab'".
  echo ""
  echo "fablo channel fetch config main-channel1 lab peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'lab'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> main-channel1 lab peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'lab'".
  echo ""

  echo "fablo channel getinfo main-channel1 insurance peer0"
  echo -e "\t Get channel info on 'peer0' of 'insurance'".
  echo ""
  echo "fablo channel fetch config main-channel1 insurance peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'insurance'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> main-channel1 insurance peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'insurance'".
  echo ""

}
