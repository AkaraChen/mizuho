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

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { deleteConfig } from './cmds/delete-config';
import { write } from './cmds/write';

yargs(hideBin(process.argv))
    .completion()
    .command(
        '$0',
        '',
        (yargs) =>
            yargs.option('delete', {
                alias: 'd',
                type: 'boolean',
                description: 'Delete the config file',
            }),
        async (argv) => {
            if (argv.delete) {
                await deleteConfig();
                return;
            }
            await write();
        },
    )
    .parse();
