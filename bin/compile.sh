#!/bin/bash

rust-musl-builder() {
    docker run --rm -it -v "$(pwd)":/home/rust/src ekidd/rust-musl-builder "$@"
}

sudo chmod 777 "$(pwd)/target"
rust-musl-builder cargo build --release