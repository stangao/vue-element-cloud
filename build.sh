#!/bin/env bash
# 打包脚本

TEMP=`getopt -o :e:i: --long env:,idc:  -- "$@"`
echo "start package"
if [ $? != 0 ] ; then help >&2 ; exit 1 ; fi
eval set -- "$TEMP"
while true ; do
    case "$1" in
        -e|--env) ENV=$2 ; shift 2 ;;
        --) shift ; break ;;
        *) echo "Internal error!" ; exit 1 ;;
    esac
done

ROOT=$(cd `dirname $0`; pwd)"/";
cd ${ROOT};

rm -rf output
mkdir -p output

npm install --registry=http://npm.intra.sit.ffan.com

if [ "$1" == "sit" ] ;then
    npm run build
elif [ "$1" == "uat" ] ;then
    npm run build
elif [ "$1" == "prod" ] ;then
    npm run build
fi

cp -r ../client-build/* output/

echo "end package"
