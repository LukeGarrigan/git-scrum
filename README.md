
<h1 align="center">
  git-scrum 🔎 🌴
  <br>
</h1>

<h4 align="center">Output your last working days commits accross all branches/repos</h4>

<p align="center">
  <a href="https://github.com/lukegarrigan/driver.js/blob/master/license">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://npmjs.org/package/git-scrum">
    <img src="https://img.shields.io/npm/v/git-scrum.svg" alt="version" />
  </a>
   <a href="https://GitHub.com/LukeGarrigan/git-scrum/issues/">
      <img src="https://img.shields.io/github/issues/LukeGarrigan/git-scrum.svg">
  </a>
  <a href="https://travis-ci.org/LukeGarrigan/git-scrum.svg?branch=master">
    <img src="https://travis-ci.org/LukeGarrigan/git-scrum.svg?branch=master">
  </a>
</p>

A tool I wrote to make my life a little easier. On a daily basis I could be working in a number branches spread across a tonne of repositories, so keeping tabs on *exactly* what I did the previous day could oftentimes be quite a challenge. There are other tools like this but none seem to output the branch name to the console, and to me the branch of a repo contains more context than my lousy commit messages, so it's needed.



```> git-scrum```

![https://user-images.githubusercontent.com/12545967/96227261-cc74a780-0f8b-11eb-9372-62aec3b789c4.gif](https://user-images.githubusercontent.com/12545967/96227261-cc74a780-0f8b-11eb-9372-62aec3b789c4.gif)



## How to use
1. `npm install git-scrum -g` 
2. Type `git-scrum` in the parent folder for all your repos


### Options
#### Relative

```bash
$ git-scrum --since 'a week ago'
```

```bash
$ git-scrum --since '1 day ago'
```

#### Specific date

```bash
$ git-scrum --since '2022-10-01'
```




