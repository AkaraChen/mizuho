/*
 *                 Copyright (c) 2021 AkaraChen
 *                        ^;^^;-
 *                        +.-.*o;^~. *;^
 *                      *..  - ~.----.-+-*
 *                     ~-....*^--~+-^..-  z
 *                  n338!$+--;-nu*+z~^+o+~+%-
 *                 o$33388+-+^+;+-+n*+*~*;-^3%.
 *                  388!36+-+ai!1$.^ -.8^a+;
 *                    +!3.---+1*z    z1*^ z;8
 *                   -!a;+~^**         1nn~.
 *                   +++++~^++-    .  i1noo+
 *                  .++++~.^*+++*  -uuuano.o
 *                  -+++-vua^+*--nuu1zzvzvo^
 *                 ++-++^v*%+^+^^++.8+ voo ;+
 *                 --. +  iz *;866$%$;a;;u  ~
 *                .^-.  ^.u1! u 66.6$i~ ^o* ;
 *               v^.-    - ^+-1~ %8*6%38 ~   ^
 *              ~^^-;.+-.   +1v  zi+a; ai.* ; ^
 *             n.^..-+. . -+.+6i661n-o3!    + *.
 *            *.^..-;nv+- n  v+^--..8+-    o~  *.
 *           +^^;..;;nvv   .*-!^*.~+z3 . ^+~o.  -
 *           *+* .;*vnnna -+^ .      u1o+.*oon    ^
 *         -++-  *^+onooo .-     -+n6i~+    oo*    ;
 *       .^.++ n.+^^;o~o3i   ++*^o^^*^^~vvzo~on     ;
 */

import os from 'node:os';
import path from 'node:path';
import { hfs } from '@humanfs/node';
import { input } from '@inquirer/prompts';
import { z } from 'zod';
import { withSpinner } from './lib/ui';
import { getUser, getUserByEmail, userExists } from './requests/github';

export const configFile = path.join(os.homedir(), '.mizuhorc');

export interface Config {
    github: string;
    email: string;
    nickname: string;
    githubUrl: string;
}

export const load = async () => {
    if (!await hfs.isFile(configFile)) {
        return null;
    }
    try {
        const content = await hfs.json(configFile) as Config;
        return content;
    } catch (error) {
        return null;
    }
};

export const write = (config: Config) => {
    hfs.write(configFile, JSON.stringify(config, null, 2));
};

export const update = async (config: Config) => {
    const current = await load();
    write({ ...current, ...config });
};

export const prompt = async () => {
    const email = await input({
        message: 'Enter your email',
        validate(value) {
            if (!z.string().email().safeParse(value).success) {
                return 'Invalid email';
            }
            return true;
        },
    });
    const githubUser = await withSpinner(
        getUserByEmail(email),
        'Check if the email have a GitHub account',
        'No GitHub account found with this email',
    );
    const githubId = githubUser
        ? githubUser.id.toString()
        : await input({
              message: 'Enter your GitHub ID',
              async validate(value) {
                  return await withSpinner(
                      userExists(value),
                      'Check if the user exists',
                  );
              },
          });
    const profile = await withSpinner(
        getUser(githubId),
        'Getting the GitHub profile',
    );
    const config: Config = {
        email,
        github: githubId,
        nickname: profile.name || profile.login,
        githubUrl: profile.html_url,
    };
    return config;
};
