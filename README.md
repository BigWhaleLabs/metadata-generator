# Metadata Generator code

This repository is used to be a metadata generator for derivatives on sealcred.xyz

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/metadata-generator`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Run `yarn start`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name                 | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `PORT`               | Port to run server on (defaults to `1337`)                          |
| `METADATA_GENERATOR` | Metadata generator server url (defaults to `http://localhost:1337`) |

Also, please, consider looking at `.env.sample`.
