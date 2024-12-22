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

import consola from 'consola';
import { readPackage } from 'read-pkg';
import type { PackageJson } from 'type-fest';
import { writePackage } from 'write-package';
import * as config from '../config';

export const write = async () => {
    let current = await config.load();
    if (!current) {
        consola.info('No config file found, creating a new one');
        const newConfig = await config.prompt();
        config.write(newConfig);
        consola.success('Config file created');
        current = newConfig;
    }
    const pkg = await readPackage({ normalize: false });
    const repoUrl = new URL(
        `${current.github}/${pkg.name}`,
        'https://github.com',
    ).href;
    const author: NonNullable<PackageJson['author']> = {
        name: current.nickname,
        email: current.email,
        url: current.githubUrl,
    };
    const json: PackageJson = {
        author,
        homepage: repoUrl,
        bugs: {
            url: `${repoUrl}/issues`,
            email: current.email,
        },
        contributors: [author],
        maintainers: [author],
        repository: {
            type: 'git',
            url: `git+${repoUrl}.git`,
        },
    };
    await writePackage({
        ...pkg,
        ...json,
    });
    consola.success('Updated package.json');
};
