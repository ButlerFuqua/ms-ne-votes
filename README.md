# Deno Hono Boiler

A starting point for a REST API built with deno using the Hono framework and
hosted on deno deploy.

## Requirements

1. deno CLI
2. deployctl
3. Deno Deploy Account

Follow the below link for instructions on how to setup the above requirements.

[https://docs.deno.com/deploy/manual/](https://docs.deno.com/deploy/manual/)

## Steps

1. Change the `example.env` file to `.env` and add your own API key and tokens.
2. Add your API key and tokens as environment variables to your deo project.

## Run dev

`deno task dev`

## Deploy

`deployctl deploy`

`deployctl deploy --prod`
