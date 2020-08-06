<template>
  <div class="page" v-loading="loading">
    <header>
      <div class="left">
        <template v-if="type==1">
          抗台人数：
          <span class="text-primary">
            <strong style="font-size:170%">{{vm.PersonCount}}</strong>人
          </span>
        </template>
        <template v-if="type==2">
          船只总数：
          <span class="text-primary">
            <strong style="font-size:170%">{{currentLv===1?listgroup1.Count:listgroup2.Count}}</strong>艘
          </span>
        </template>
      </div>
      <div class="right">
        <el-radio-group v-model="type">
          <el-radio-button :label="1">人员调配</el-radio-button>
          <el-radio-button :label="2">防台预案</el-radio-button>
        </el-radio-group>
      </div>
    </header>

    <main v-show="type==1">
      <div class="lv-1">
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 155 154.07"
        >
          <defs>
            <filter
              id="luminosity-invert"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
            </filter>
            <mask id="mask" x="46" y="45.07" width="63" height="64" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="63"
                  height="64"
                  transform="translate(46 45.07)"
                  xlink:href="data:image/png;base64,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"
                />
              </g>
            </mask>
            <mask id="mask-2" x="13" y="44.07" width="40" height="91" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="40"
                  height="91"
                  transform="translate(13 44.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABbCAYAAAABSMcCAAAACXBIWXMAAAsSAAALEgHS3X78AAAAeUlEQVRoQ+3OoQHAMAzAsGz//9ydMGDQAAkb+JmZM4u9f8FtBiuDlcHKYGWwMlgZrAxWBiuDlcHKYGWwMlgZrAxWBiuDlcHKYGWwMlgZrAxWBiuDlcHKYGWwMlgZrAxWBiuDlcHKYGWwMlgZrAxWBiuDlcHKYLV+8AOTgAG1mjLRFgAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-3" x="87" y="123.07" width="31" height="17" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="31"
                  height="17"
                  transform="translate(87 123.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAARCAYAAAAlpHdJAAAACXBIWXMAAAsSAAALEgHS3X78AAAAK0lEQVRIS2NkYGD4zzBAgImQAlqCUcsHBIxaPiBg1PIBAaOWDwgYtXxAAADWmQEhTe4ZCQAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-4" x="123" y="36.07" width="19" height="57" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="19"
                  height="57"
                  transform="translate(123 36.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAA5CAYAAADUZxCcAAAACXBIWXMAAAsSAAALEgHS3X78AAAAPElEQVRYR+3MwQ3AIBDAsIP9d25HQJb4Eb+jrJn55pJ9CkQz18w1c81cM9fMNXPNXDPXzDVzzVwz98jsB/NtAXGkLMtOAAAAAElFTkSuQmCC"
                />
              </g>
            </mask>
            <mask id="mask-5" x="61" y="12.07" width="57" height="19" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="57"
                  height="19"
                  transform="translate(61 12.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAATCAYAAAAqL6XVAAAACXBIWXMAAAsSAAALEgHS3X78AAAANElEQVRYR+3PoQEAAAiEwNf9d9YR7MhlCpVkAtdXQOAkhZMUTlI4SeEkhZMUTlI4SfFicgE+/wElMwnvKQAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-6" x="20" y="92.07" width="81" height="45" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="81"
                  height="45"
                  transform="translate(20 92.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAtCAYAAADWb4eMAAAACXBIWXMAAAsSAAALEgHS3X78AAAAfUlEQVRoQ+3QoQEAIAzAsMH/P8MJCCoTXdU1M2f4sl8BbyYGTAyYGDAxYGLAxICJARMDJgZMDJgYMDFgYsDEgIkBEwMmBkwMmBgwMWBiwMSAiQETAyYGTAyYGDAxYGLAxICJARMDJgZMDJgYMDFgYsDEgIkBEwMmBkwMmBi4K74BWWTAud8AAAAASUVORK5CYII="
                />
              </g>
            </mask>
            <mask id="mask-7" x="125" y="79.07" width="14" height="31" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="14"
                  height="31"
                  transform="translate(125 79.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAfCAYAAADXwvzvAAAACXBIWXMAAAsSAAALEgHS3X78AAAAK0lEQVQ4T2NkYGD4z0AGYCKkABcY1YgHjGrEA0Y14gGjGvGAUY14wEjQCAC5ZgE9rSXFZgAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-8" x="80" y="16.07" width="49" height="30" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="49"
                  height="30"
                  transform="translate(80 16.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAeCAYAAACFZvb/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAQElEQVRYR+3PsQ0AIAzAsML/P8MJrEGy5yxZM3Pmc/sV/MBEhYkKExUmKkxUmKgwUWGiwkSFiQoTFSYqTFSYqLjIDwE70ZomqQAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-9" x="25" y="17.07" width="46" height="34" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="46"
                  height="34"
                  transform="translate(25 17.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAiCAYAAAAge+tMAAAACXBIWXMAAAsSAAALEgHS3X78AAAARElEQVRYR+3OsQ0AIRDAsIP9d/4fgS4Cya5TZM3MNw/ap+BWxmvGa8ZrxmvGa8ZrxmvGa8ZrxmvGa8ZrxmvGa8Zrxms/0v0BQ+ThFHkAAAAASUVORK5CYII="
                />
              </g>
            </mask>
            <mask id="mask-10" x="37" y="36.07" width="81" height="69" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="81"
                  height="69"
                  transform="translate(37 36.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABFCAYAAAAyyAq7AAAACXBIWXMAAAsSAAALEgHS3X78AAAAsElEQVR4Xu3QoQEAIAzAsMH/P8MJCCoTXdU1M2f4sl8BbyYGTAyYGDAxYGLAxICJARMDJgZMDJgYMDFgYsDEgIkBEwMmBkwMmBgwMWBiwMSAiQETAyYGTAyYGDAxYGLAxICJARMDJgZMDJgYMDFgYsDEgIkBEwMmBkwMmBgwMWBiwMSAiQETAyYGTAyYGDAxYGLAxICJARMDJgZMDJgYMDFgYsDEgIkBEwMmBkwMmBi4N8IBiThCHvAAAAAASUVORK5CYII="
                />
              </g>
            </mask>
            <mask id="mask-11" x="27" y="27.07" width="62" height="95" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="62"
                  height="95"
                  transform="translate(27 27.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAABfCAYAAACwaXS7AAAACXBIWXMAAAsSAAALEgHS3X78AAAAhUlEQVR4Xu3PsQEAIAyAsOr/P+sJ7obMLKyZOQPar+BXjWsa1zSuaVzTuKZxTeOaxjWNaxrXNK5pXNO4pnFN45rGNY1rGtc0rmlc07imcU3jmsY1jWsa1zSuaVzTuKZxTeOaxjWNaxrXNK5pXNO4pnFN45rGNY1rGtc0rmlc07imcQ07fgG0nwG9Z5t36gAAAABJRU5ErkJggg=="
                />
              </g>
            </mask>
            <mask id="mask-12" x="106" y="62.07" width="22" height="54" maskUnits="userSpaceOnUse">
              <g class="cls-37">
                <image
                  width="22"
                  height="54"
                  transform="translate(106 62.07)"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAA2CAYAAADDGGkNAAAACXBIWXMAAAsSAAALEgHS3X78AAAAPklEQVRYR+3MsQnAQBDAsEv23/nTqQ08XGfVxs/MnFnw/gW3GtOYxjSmMY1pTGMa05jGNKYxjWlMYxqzNv4AuRIBa+rw/hgAAAAASUVORK5CYII="
                />
              </g>
            </mask>
            <linearGradient
              id="linear-gradient"
              x1="69.79"
              y1="72.45"
              x2="85.45"
              y2="72.7"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#40daff" />
              <stop offset="1" stop-color="#2199e9" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="69.73"
              y1="76.02"
              x2="85.4"
              y2="76.27"
              xlink:href="#linear-gradient"
            />
            <linearGradient
              id="linear-gradient-3"
              x1="69.73"
              y1="75.86"
              x2="85.4"
              y2="76.11"
              xlink:href="#linear-gradient"
            />
            <linearGradient
              id="linear-gradient-4"
              x1="69.98"
              y1="60.41"
              x2="85.64"
              y2="60.66"
              xlink:href="#linear-gradient"
            />
          </defs>
          <g class="cls-1">
            <g class="cls-2">
              <image
                width="155"
                height="154"
                transform="translate(0 0.07)"
                xlink:href="data:image/png;base64,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"
              />
            </g>
            <g class="cls-3">
              <image
                class="cls-4"
                width="73"
                height="74"
                transform="translate(41.32 40.39)"
                xlink:href="data:image/png;base64,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"
              />
              <circle class="cls-5" cx="77.6" cy="76.96" r="29.2" />
              <circle class="cls-6" cx="77.6" cy="76.96" r="29.2" />
              <g class="cls-7">
                <g class="cls-8">
                  <circle class="cls-9" cx="77.6" cy="76.96" r="29.2" />
                  <circle class="cls-10" cx="77.6" cy="76.96" r="29.2" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="65"
                height="116"
                transform="translate(0.93 32)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-11" d="M50.36,132.12A61.57,61.57,0,0,1,24.11,46.57" />
              <g class="cls-12">
                <g class="cls-8">
                  <path class="cls-13" d="M50.36,132.12A61.57,61.57,0,0,1,24.11,46.57" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="56"
                height="42"
                transform="translate(74.93 111)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-11" d="M115.16,125.67a61.17,61.17,0,0,1-25.55,11.62" />
              <g class="cls-14">
                <g class="cls-8">
                  <path class="cls-13" d="M115.16,125.67a61.17,61.17,0,0,1-25.55,11.62" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="44"
                height="82"
                transform="translate(110.93 24)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-11" d="M126.2,39.26a61.62,61.62,0,0,1,11.34,51.56" />
              <g class="cls-15">
                <g class="cls-8">
                  <path class="cls-13" d="M126.2,39.26a61.62,61.62,0,0,1,11.34,51.56" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="82"
                height="44"
                transform="translate(48.93)"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAtCAYAAADSmlexAAAACXBIWXMAAAsSAAALEgHS3X78AAAKIUlEQVRoQ+2a2U7j2BaGv7XtTE2MQyDQSLQKHVEtHeoyL5CX4Hk4PA8vkRfIZdNSN2pVqZEQhClx6Ey217nYtuMwJVVFz/xSYsdxdnY+r3E7oqq86XVkFp3wpuX1BvMV9QbzFfUG8xXlLjrhcyUiAklS+5LcJrNd1S8a4U+TfG02F0l+/sNhjo4EDh9/IH/o6PHbcASHh09PSuyTfu2kfyd9kWWKIBk8BY4QjpgHtb+fszE44Ant283xUwfzSqErCoqk9pt8w1/Fgj/LMucgHiEZvOPkZx0A7ba0aGWfCX7q2PeaTZ5VpwOA931zbjLtVvJtKe2DHLQU8GHumPy5YJeGmYFMIaYAG22BFk2vI2CBjSqzyDf+dJrs78H7h6MCPwOcAlB6tzebzA8nlP+zn732AgupDdBCHwG2nvGngl0K5pMgGwheR5o0M3jjIhKefRTYhV3YPj9LQO7YzXdPDP5runMGwPn2jp3QR/vk7uwqP0PpnQVTHqaAOnhBU9swg/ss2D8mzi6Mmc+BbHrIqNKUXhEJz5CwdCZ8t8OWtysA0z5yv2IhRjddYRPoNx5/gd+FS3DqFuJqH+CCgrelsAu9c4q1bf21d4a7vaP3lylgn9E79MMPJ5Q7++o10HYboYXOhd2jI1BVAfm9rXUhzIcgWw0k8JDe5akJK3sSlpDYQzYKOxKddmW02SC8RahC7e5GoA6VBhQh7N0mlroG3ALg+g1lB7gGuAHgrral4wDgCndtW0dBl3p9R+lfUPB2ld45F7U9Db9BaXzD+BLNg+00UDKwCdkjQPldob7o5rmEI/MWidxfYsISUl/BRC4S3iKRi/jurcAakXMnUAMgGvQE3wfAz43fy+/1wKn6yWTucKJasn+LG67pNTc4tbpydYW7tqFOiMIFhemWXkxQOMMdh+oOd7X0DrXhoEMnaOpcGMiHgFeGurgDOiLL1DOQHxOQFyZykXFwY6plTLWEmQyNmRQx06ExlSKmOAmcStGYyhBTKWAmuUclfQyNqRRNci6mMqyZ0aTvTIqYSXHNjEuYaqluKud3TrW8YcrDW+e34Y0zLm2ZUQXjj7tOfaVg1r1dM6ph7r/B9HxM79I3HzZPTLODoYEAwn6yPbKGIiBZrfyVetnNrYvnEg6MPyH8d5eta2TkbknoIL5bl8hBpsO+oe6zMgiEtVUm94HgeLPxnrt0uXOiIUIxoIzgFFD6AfdVz1pPyRAVUXqGatVXZ4DCLb1KQ50SOg6u8Keqzk+xXq3HamplDS9dHQ/RD+/QcgcbAmBWzqbuL8jXWumzbv7QxVsNpLt5YsbFfRl1MfUVzDi4MjV3Q8alOxM5NZkOA7MKRA4CHrEZJFe8+mD0AY+VP8e+b1aqShBkR50VT/v9AKfqKfQx0apCDyfy1YYG1V6o6oR1dddQJ0SvpqiZoO4YdYdkIaATkLj/MZwc6Gu4/uIEBLP25WSf8OyjfFfa5R6ADVgHBrXcyR4QJI9X8B7PWm18PxAMrDjAMBBnZVX7g0DAEEd9BUMUqVarvjou2gtQp4auuahTQK+KaFhCw0t0PDzVD4OJljtD7TQO9LWsdDmYmU6Ab/gVqAPuGso14jTQ6L4nTiR678PKAFgF7p+bz6J5VoGAzCq9XKhIFN0HsuJYa6WP9AnAXyXu9SWKVrVaRZ0B2gufglpW3u/FTGyb0UkH3T+Go4Ms6+viic5pOZjH0G5A09vX8RBlFwrXaOR25a7W0FoMUaTqVHyNop4MK77Gt31Z9dFcys7pmTnmUz0e0SCwph0DsZJ3+VTRfSA4sAI4A8AR7n0WQC3oTRfCMTaeDk4SK23ka9TPBvpyaZRmvf2HZdFHE5Z2ZauIjCqYtCxaX09rybQ0Au7A8WoLJxQFd0IWLR6XVPGgb8fzVzPIq6u5xHUfZDHFiTyFJHH1+phI1an66kRoL7zRklePnRAtTNGLyZmWGztxaWJjqReg7S6adFOKfVo4f1gEM5+EQGgjH7onZlwtSlhxJQU6LSC2y2kQ3l4lP2ojGeXqybGf1Ib9THR3I+vUAQjTujWDXcsgx4O+4EM0EAsXz4aXVH1ryfeRp6aK0utRrPix66N3F6g77WrZa8QXE7TcIAPaCVDyQJdMSgt7c0lBHh8LjYY0f/JktFaRFCi7u4TnyFbxXGD7xbGW0bRwIbAFpG1oeoE2iFzbUdnGACJHBGpETk/iBKg9Ns8UrLX2Sa1UtVStxXcR6p6nQOcttNMkBrIifxnrXBam3U2A2lUi6/LjT6fC+z2yBY45JX30kgrPku/ahfD8TGCH9CJNry+Eb7fmAW9sEN3ZrisKRKjViAYIPsTJFmBlEIhT9bQPzNx+BrQ0Ji5M0et1YjdE/R7xl1jnQpjwBFAOSDoKmp7djn45kYcLu+X/LL6aeY1+ORE+zMYYf0J4T3ahwpIFHBfPZZttpgUkcrsS3koOLBI5dxINJIFqLRWfrH811VV1IpIYijrhlZa8jfimTuyeftSVzd34kXX+D30VmJAD+nA984kF4VSN1ufB7LaziwZA4M1eZ8t8mSfkVqou0riNhIUriVwjsSuyxlrSQJBtM/V6OFVVJ1IdVNfi1N2v14ndH1F/M2edJ+gyrr40TJhLSLOe/fD5879YqfXDo4sVJIvQo4r1hHQNNSy5Ehcd2bg2EhWNhIXEWh3E71lrhXxzAU6Ewi2D6lrsRmh5SBY7/R7xo8y+wNWXqzMTpQMlCwNL5Lcv1MnJ/OtWyy4CHyN0m0qjLQQtbXodKQ+bOtr8TcafisL7PfoBdlmwiGyMbck2qCLRXU1i91bWALsECOmKFFfAtAteg++ALqQ3Dea14Pd+lmU+pZdWXBbFmKc0N97DT+e9IYvdbcnfNrFJEQkrOahJ6RYWRNKqYB24q9WVK9vJpXVnloT2iD3QNolVLlFzfpZlPqUvAfaSnhvvkTek1nvYUo6PpdM9mFnsZlppWKg3JST2Qtm4NsK3EN1EMqCBOwTo4oQNLUzR4gTlI5Q2UTrQDrBmmq5N2Bk8q6+G+UcpDzn5o8M82EOAlnKMdFoobWQG9VTCiiv975Oa2GvkvKkB03MuJtvqbqNuiDJhXkcslRsWLw7/BaWqqmqzq4Imf1qwj5Nk27WlzQ+XxKebe/HK5m/xym/E5QbxdZA81m3CuQ62Y3f8Ud0QneuCWqTJJ/nel73wb2OZLymNY0m1YX9wmsO6QAv9ob0veEhziI42kzLrx1NxQeGU0rs9ZWLvfnrZWifWxQ/RRS4O/xCYqeaqjWegdtoIAbYS2Mz96WHYwWs2td1m/tZx4uKLrBL+YTBTvQzVUuq0mkq7LQAtkj832PBgtwfM7r8vYZXwCqXR30EvNhvHx7NkdHCgyTlfdAfzH2mZD/ViszHfINh3DplBXAqj1b/CMp/TnMVmB5e3xIf6V8N8bf0t68y/qt5gvqLeYL6i3mC+ot5gvqLeYL6i/g/Zu7ez0U6QcQAAAABJRU5ErkJggg=="
              />
              <path class="cls-11" d="M63.33,17.12A61.6,61.6,0,0,1,115.62,28.6" />
              <g class="cls-16">
                <g class="cls-8">
                  <path class="cls-13" d="M63.33,17.12A61.6,61.6,0,0,1,115.62,28.6" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="104"
                height="68"
                transform="translate(8.72 80.78)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-17" d="M98.93,131A58.13,58.13,0,0,1,22.7,94.49" />
              <g class="cls-18">
                <g class="cls-8">
                  <path class="cls-19" d="M98.93,131A58.13,58.13,0,0,1,22.7,94.49" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="37"
                height="54"
                transform="translate(113.72 67.78)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-17" d="M135.87,81.79A57.84,57.84,0,0,1,127.62,107" />
              <g class="cls-20">
                <g class="cls-8">
                  <path class="cls-19" d="M135.87,81.79A57.84,57.84,0,0,1,127.62,107" />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="72"
                height="53"
                transform="translate(68.72 4.78)"
                xlink:href="data:image/png;base64,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"
              />
              <path
                class="cls-17"
                d="M82.88,18.87A57.85,57.85,0,0,1,117.33,34,58.51,58.51,0,0,1,126,44"
              />
              <g class="cls-21">
                <g class="cls-8">
                  <path
                    class="cls-19"
                    d="M82.88,18.87A57.85,57.85,0,0,1,117.33,34,58.51,58.51,0,0,1,126,44"
                  />
                </g>
              </g>
            </g>
            <g class="cls-2">
              <image
                class="cls-4"
                width="69"
                height="57"
                transform="translate(13.72 5.78)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-17" d="M27.3,48.41a58.15,58.15,0,0,1,41.41-29" />
              <g class="cls-22">
                <g class="cls-8">
                  <path class="cls-19" d="M27.3,48.41a58.15,58.15,0,0,1,41.41-29" />
                </g>
              </g>
            </g>
            <g class="cls-3">
              <image
                class="cls-4"
                width="91"
                height="79"
                transform="translate(32.36 31.43)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-23" d="M42.27,90.63A37.79,37.79,0,1,1,106.08,102" />
              <g class="cls-24">
                <g class="cls-8">
                  <path class="cls-25" d="M42.27,90.63A37.79,37.79,0,1,1,106.08,102" />
                </g>
              </g>
            </g>
            <g class="cls-3">
              <image
                class="cls-4"
                width="72"
                height="105"
                transform="translate(22.36 22.43)"
                xlink:href="data:image/png;base64,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"
              />
              <path class="cls-26" d="M53.79,119.12A47.88,47.88,0,0,1,86.38,30.51" />
              <g class="cls-27">
                <g class="cls-8">
                  <path class="cls-28" d="M53.79,119.12A47.88,47.88,0,0,1,86.38,30.51" />
                </g>
              </g>
            </g>
            <g class="cls-3">
              <path class="cls-26" d="M123.73,64.72a47.93,47.93,0,0,1-14.69,49" />
              <g class="cls-29">
                <g class="cls-8">
                  <path class="cls-28" d="M123.73,64.72a47.93,47.93,0,0,1-14.69,49" />
                </g>
              </g>
            </g>
            <text class="cls-30" transform="translate(60.23 92.63) scale(0.98 1)">{{vm.Leader}}</text>
            <circle class="cls-31" cx="86.08" cy="30.3" r="1.89" />
            <circle class="cls-31" cx="48.47" cy="39.15" r="1.89" />
            <circle class="cls-31" cx="32.99" cy="60.54" r="1.21" />
            <circle class="cls-31" cx="110.42" cy="112.16" r="1.21" />
            <circle class="cls-31" cx="125.16" cy="72.34" r="0.8" />
            <circle class="cls-31" cx="123.69" cy="64.96" r="1.21" />
            <circle class="cls-31" cx="46.26" cy="55.38" r="1.89" />
            <circle class="cls-31" cx="115.58" cy="76.76" r="1.4" />
            <circle class="cls-31" cx="111.89" cy="92.25" r="2.51" />
            <circle class="cls-31" cx="33.72" cy="96.67" r="2.51" />
            <text class="cls-32" transform="translate(63.89 121.81) scale(0.98 1)">组长</text>
            <path
              class="cls-33"
              d="M85.81,78.06a.87.87,0,0,1-.89-.9V72.47a3.6,3.6,0,0,0-3.56-3.63H73.84a3.59,3.59,0,0,0-3.55,3.63v4.69a.89.89,0,0,1-.89.9.87.87,0,0,1-.63-.27.89.89,0,0,1-.26-.63V72.47a5.47,5.47,0,0,1,1.56-3.85A5.22,5.22,0,0,1,73.85,67h7.51a5.28,5.28,0,0,1,3.77,1.59,5.47,5.47,0,0,1,1.56,3.86v4.69a.88.88,0,0,1-.25.63.9.9,0,0,1-.63.27Z"
            />
            <path
              class="cls-34"
              d="M72.5,78.06a.88.88,0,0,1-.63-.26.92.92,0,0,1-.26-.64V75a.89.89,0,1,1,1.78,0v2.18a.89.89,0,0,1-.89.9Z"
            />
            <path
              class="cls-35"
              d="M82.7,78.06a.88.88,0,0,1-.63-.26.92.92,0,0,1-.26-.64V75a.89.89,0,1,1,1.78,0v2.18a.89.89,0,0,1-.89.9Z"
            />
            <path
              class="cls-36"
              d="M77.86,65.47a4.93,4.93,0,1,1,4.93-4.93A4.93,4.93,0,0,1,77.86,65.47Zm0-8.36a3.43,3.43,0,1,0,3.43,3.43A3.44,3.44,0,0,0,77.86,57.11Z"
            />
          </g>
        </svg>
      </div>
      <div class="lv-2">
        <!-- <div class="lv-2__bg">
          <svg
            class="svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 79 249"
          >
            <defs>
              <filter
                id="luminosity-invert"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" />
              </filter>
              <mask id="mask" x="7" y="7" width="30" height="30" maskUnits="userSpaceOnUse">
                <g class="cls-35">
                  <image
                    width="30"
                    height="30"
                    transform="translate(7 7)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsSAAALEgHS3X78AAAEQElEQVRIS8WXW2/aSBiGHx/wuYAJoTaFJgpN24sq//+3UFQlJSSUcDLBxManvVgxgjoHdlfVvhKSL755H894Zr4XCSj4HyS/VfCnpL5VsK9Op4PrumiahizL5HlOkiQsFguGw+Fbww8k8cZSt9ttms0m9Xodz/N49+4dpmkKcBzHBEHAZDIhCAIeHh64vb19zRJ4Y8YXFxdcXl7i+z7NZpNGo0G1WkXXdRRFEeD1es1isWA6nXJ/f49lWfT7/desXwZ/+vSJb9++cXFxQbvd5vT0lHq9juM4YqmLomC73RKGIY+Pj8xmM96/f0+9Xsd1XUaj0YuzfxZ8eXnJ1dUVnz9/5vz8HM/zODk5oVarYZpmCRxFEev1WtTYto3jONi2TZ7n3N3dlRglcK/X4+rqiq9fv9Lr9eh0OrRaLVzXxbZtNE2jUqkgSRJFUZCmqYDvvr+u66iqSpqmPD4+vg3udrt8+fKFXq/H+fk53W4X3/c5OTnBcRwMw0BVy4uUZRmWZYmXkmWZLMt4enpitVoxmUy4ubk5GHPg4nkeHz9+pNvt0m638TyPZrNJrVZD13UkSeI5KYqCoijIsowkSWRZRhzH4rv7vl8Ciwuk0+nw4cMHPM+j1WpxenqK67o4jvMqdF+apuE4DrVajUajQbPZpNVq4fs+nU7noFaAXdel0WjQaDRwXZdqtYpt2xiGcRR0p0qlgmma2LZNtVqlVqvhui6u6x7UCbCu62InWpaFZVnivP4TybKMpmkYhoFhGJimKbwO6nYPqqqKAbquo2nasxvpGCmKgqqqVCoV8ft9AgIsyzKyLJc2yr+RJEnCT1VV8byvUncqiv/eJYuiED77z/sS4DzPybKMLMtI05Qsy8jzvDTgGBVFIfzSNCXP85KXAO/fQHEcs91uSZKkZHqMkiQhjmPhs91uybLsoEaA4zgmDEPCMGS9XhOGIXEck6Zpyfg17U9gs9mwXq/ZbDZEUXRQJ8CLxYLZbMZ8Pme5XBIEAWEYEkXR0UteFAVRFBGGIavViiAICIJAeO5LnJfb21t83z+4my3LQlVVJEkSzf8l7UN3sOl0ymQyYTwel9rjwUH99esXNzc3oiFomoYkSeR5TpqmmKYpjsc+MMsy0Rrn8zkPDw+Mx2NGoxHD4ZD7+3t+1wH458+fqKqKYRii9WVZRpIkRFF00KEURRFtMY5jNpvNQfQZDodcX1/T7/efzWOlq+nHjx+oqnpg+vT0VAoCu5rdRlqtVszncyaTCcPhkMFgQL/ffzECPXsn9vt9cQZ3PXUXBnbdajfjJEkIw5Dlcsl8Pufu7o7r62sGgwGj0eg5e+CNlHl2dobv+5ydndFqtUTaNAxDgHdhbzabMZ1OGY/HfP/+ncFg8JItcES8hb9fwPM82u02rutimqZImVEUiXi7XC6ZzWZHxdujwDt1u12RRv54oP9T+t/+O/0FDHhTur1g1o4AAAAASUVORK5CYII="
                  />
                </g>
              </mask>
              <mask id="mask-2" x="32" y="55" width="30" height="30" maskUnits="userSpaceOnUse">
                <g class="cls-35">
                  <image
                    width="30"
                    height="30"
                    transform="translate(32 55)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsSAAALEgHS3X78AAAEYElEQVRIS8WWbXOaWhRGl6IiICKi1mA07TiZdqb9/3/GaROrie8EBVEUsB/ucCY02qS9vXOfGb7AZi/24Zy9nxxw4n9Q/rWA/0qF1wKeq9PpYJomsiyTz+dJkoTj8cjT0xOj0ei11zN6E/jm5oZ2u41t29RqNVRVRZIkkiQhDEM2mw3z+Zz1es1yueT79++vpfw1uNvtcnV1xc3NDVdXVzSbTQzDoFwuI0kSp9OJw+GA7/us12tWqxWz2Yxms8l0OuXh4eFi7ovgfr/Pp0+f6PV6XF9f02q1qNfr6LqeAR+PR7bbLb7v4zgOi8UCy7IYjUbIssy3b9/O5j8L7vf7fPnyhdvbW1Fto9EQy5z+4xQchiG+72NZFqZpomkamqYBEIbh2cpfgD98+MDnz5/5+PEj/X6fTqfDu3fvME1TVFssFsnlcgBEUcTxeGS/31OtVtE0jVKpRD6fZ7/f47ru62Dbtrm9vaXf7/P+/Xu63S62bWNZFrquo6oqhUJBQFMlSYKiKMiyLD4qjmOCIMB1XWazGff395l3MuBGo4Ft2+Jqt9s0Gg0Mw0BVVfL588c+n8+L/57L5cRu9zyP1WqFbdsvwJlM1WqVRqNBs9nEsixqtZqo9BL0uYrFIpqmUa1WqdfrWJZFq9Wi0+nQ6/UysSLb9fU1tm1Tr9cxTRPDMNB1HUVR3gRNVSwWURSFSqWCYRiYpollWViWlYkTGU3TpFqtUq1WqVQqYvcWi8UXyX+lXC5HqVSiXC6jqiq6rovruQRYlmUURaFcLiPLMqVS6behqSRJolgsIssy5XKZSqVCvV6n0+mIGAHO5/NIkkShUECSJLFR/kS5XC6TT5ZlVFUVZxvOTKfT6cTp9O8n5c85kiTJ3BPgJEmIoogoiojjmDiO//gDkiQhjuNMcwmCgCAIRIwApw/3+z1hGBKGIYfD4Y/gURRxOBzY7XZst1s8z3vRwQTYdV08z8PzPHzfJwgCwjAkiqKzyS8pjmPCMCQIAjE8NpsNnudl4gR4PB4zn89xHAfXddlsNvi+z263I47jF4BzSsdkEAT4vo/rujiOw3K5xHGcTGymZT49PbFcLlksFhiGkWn4iqIgSRKXdDqdxJRar9c4jsNqtWI+nzOZTBgOh5n4DHi1WvH4+EitVkPTNGRZFr03iiIURRHH7TkwjmP2+z3b7RbXdVksFsxmM6bTKY+Pj0ynU35WBvzw8ECpVBKTJrU36c6sVCpiLKbP0oGw2+2E9ZlMJoxGI4bDIcPh8MWAeAEGuLu7o1D45/bzjWJZVmbeplVHUcR+v8fzPOFAxuMx9/f33N3dMZlMfkYAFxzIYDAQ5zAIAjabjXAglUpFLDkgrI/neaLa4XDI169fmUwmF31Xjl8Y+l6vR7vdptfrCXBqbdI+npq9dPfOZjMGgwGDweBSWuAVcKputyvArVYLXdcplUoAZ+3teDx+JeMbwc/V7XYxTTOz1K7r/rah/23w39LbrcVf1g+Q7FQjY6TvrwAAAABJRU5ErkJggg=="
                  />
                </g>
              </mask>
              <mask id="mask-3" x="42" y="108" width="30" height="30" maskUnits="userSpaceOnUse">
                <g class="cls-35">
                  <image
                    width="30"
                    height="30"
                    transform="translate(42 108)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsSAAALEgHS3X78AAAETElEQVRIS8WWa3OiWBCGHxRFVG5emKgY/TKp/P+fM6lMTEbRGEVFBRHB/ZDibIy5bu3WvlVWadn0Q5/u090ScOR/UO4zg/9K8mcGr3V5eYlpmhQKBSRJIk1ToihiuVwyGo0+e1zoS+But0uz2cQ0TZrNJpqmUSqVkCSJJEnYbrf4vs94PGYymTAYDD5z+THYcRwuLi7o9XrYto1pmliWRaVSoVgsIkkSh8OB3W7Her3m6emJyWSCbdu4rstwOHzX97vgfr/P9fU13W4Xx3GwbRvLstA0jXK5jCw/P5okCVEUsdls8DyPHz9+UK/XaTabqKrKzc3Nm/7fBDuOw/X1NVdXV/R6PTqdDo1GA8MwqFarFItFCoUC8Aze7/cEQUC9XseyLHRdR9M0ZFkmTVNub2/PGG+CO50O/X6ffr9Pr9ej1WpRr9dFbovFIvl8HngGHw4HoihC0zQqlQqlUglFUQA4Hp9v62v4GTiDOY6D4zi0222R30qlQqFQIJc7vYXH45E4jlEUBUVRhM3hcBA1EIYhruu+D261WrTbbS4uLrBtWxxftVoVx/takiSJU3h5ElEUsd1u8TyPyWTyPjiL1LZtGo0GlmVhGIaI9DPl83lUVRV53263LJdLarUauq6f2J6cWa1Wo9FoUKvVRCGpqvolaKYMXq1W0XUd0zSp1Wq0Wi0uLy+F3QlY0zR0XUfXdSqVCuVyGUVRkCTpDPCRZFlGURTK5TLVahXDMDAMA9M0hY0At9tt6vW6iLJUKlEoFETOvqNcLkexWBTFViqVUFWVYrH4t032RdM0VFUVVSnLMvl8/qyCv6pcLkc+n0eWZfF5GYTwmt23TN893tc6Ho8nPl//FuDNZkMYhsRxzOFwIEkS0jQ9e6GvKmssLz9pmor/Bdh1XRaLBev1mjAMxUskSfKm44+UpilxHBNFkWge2+2WMAyFzUkCfd/H933W6zVBEBAEAVEUfTvqOI7Z7XYEQcB6vWa5XLJYLPB9X9icgOfzOU9PT8zncxF9EATs9/sz5+8pjmMxn5fLJZ7nCb9//vwRdied6/7+nna7TafTodlsYhgGqqoiy7Joix8pg65WKxaLBbPZTASyWq1ObM969Xg8xnVdcadfrjjZdctmcaYkSU4inc1mTCYTxuMxo9GI0WiE53knz5yBB4OBiDbrWmmast/vxQlk9/wldLfb4fs+nufx+PjIcDjk7u6O379/MxgMTgbEm2B4jjpr6tlY2263mKYpZnLWv7NZnA2E2WyG67o8PDzw69cvbm5uuLu7O2O8CR4Oh6RpymazIQgCkbdsymTTKtu5wjBks9kwn89FtA8PD9ze3r65fQBIfLLQX11d8fPnT7FLZbnPlr0kSQiCgNVqxXQ6ZTqdcn9/z+Pj40kVv9anYEDsXJZlYds2uq6frbdZbqfT6ZfW2y+BX6rb7WJZ1km1Z4X10Tr7Wt8G/1v6ZzPvX9BfN5ZKvAf+WTwAAAAASUVORK5CYII="
                  />
                </g>
              </mask>
              <mask id="mask-4" x="34" y="162" width="30" height="30" maskUnits="userSpaceOnUse">
                <g class="cls-35">
                  <image
                    width="30"
                    height="30"
                    transform="translate(34 162)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsSAAALEgHS3X78AAAEO0lEQVRIS8WXf3OaShSGH4ygqGARYxKUMZm2mXz/jxNrJxqVqJUQRX4YwP7RYW9oTWx6752+MwwzcHgfOLt79iABe/6CSscC/i/9NXD5WEAu27YxDINKpUK5XEaSJAD2+z1pmhJFEZ7nMR6Pjzj90FFwv9/n/Pwcy7JotVrU63VkWebk5ASALMvY7XYEQcDj4yOWZeE4DqPR6E3fV8HdbhfLsuj3+1iWxenpKYZhUKvVqFQqBXAcxwLc6/WYzWZ0Oh0cx2EymRz0Pwju9Xrc3NxweXmJbducn5/TbrfRdZ1arYaiKJTLPx5NkoTn52fCMMTzPDqdDqZp0mw20TSNLMuYzWa/MA6Cu90uV1dXfPr0Cdu2OTs7wzAMGo0GqqoiyzKlUglJksiyTIBbrRaGYaBpGtVqFYDtdvt74M+fP/Px40eurq64vLwUaW42m6iqKtJcKv1YEFmWiXRrmoaqqiiKQqlUEi/kui6DweB1cLfb5fr6mn6/T7fb5eLigrOzMzGpKpWKmM258rFWFEXM+FKpRJZlRFGE7/t4nkcQBEyn08Pg09NTLi4usCxLjGueOkVReEuSJIkXy9Pv+z5PT0/M53Pa7XYBXCgghmFgmqaYHLquU6/Xj0JfSlEUarUauq5jGAatVgvTNDEMoxAnwLZtiyWjaVphvN6rSqWCqqpomoau65imSafTwbZtESPAHz58QNd1NE2jXq9TrVZRFEWM4XtULpdRFIVqtUq9XqfRaIgM5BLgPDBfoy+r058o95BlWXjLsizuC7AkSYUjv/ZvlHvla/6lnwBnWUaapiRJQpqm4vhTZVkmvPJzlmXivgDHccx2uyWKIuI4ZrfbkSQJ+/37+4R8OcVxTBiGRFEkvHMJsOd5rNdrNpsNvu8TBAFxHJMkyUHzt/T8/EwURQRBgO/7PD4+4rou6/VaxAjwdDrFcRyWyyWu6/L09MRmsyEMw3elPEkSgiBgs9ngeR6r1YrlcslisSjsVIXK9fDwwMPDg9gU8mJ/cnKCqqqiPr+mNE0Jw1B85bdv31gsFiwWC+bzeSG2AL67u6PT6dBut2k2m9RqNWRZRpIk9vs91WpVbIc/K0kSwjBkvV6zWq2Yz+c4jsN0OmU0GnF3d1eI/8XFcRzG4zGapomdKG9vGo2GgL9sfZIkIYoiNpsNrusym80KwJ+/9iD4/v6+YJ63NmEY0mw2Re3Oi0uapux2O7bbLZ7nsVwumUwmfP36ldvbW4bD4cE+7GDeBoMB+/0eSZJI01QstXx7zMcd/hnX7XaL67rM53NGoxGDwYDb21u+fPlyCPF6z5U/EEUR6/Ua13UxTfNVsO/7rFYrZrMZ4/GY4XDIcDh8zR6JI38SvV4Py7KwLAvTNGk0Gr+kOo5jAZ5MJiwWC+7v79+yPQ7O1ev1aLVahS4DilXKdd3CZv+Wfhv8X+uv/cJ8Bx21QXVf9+ozAAAAAElFTkSuQmCC"
                  />
                </g>
              </mask>
              <mask id="mask-5" x="10" y="212" width="30" height="30" maskUnits="userSpaceOnUse">
                <g class="cls-35">
                  <image
                    width="30"
                    height="30"
                    transform="translate(10 212)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsSAAALEgHS3X78AAAESElEQVRIS8WWa2+iXBeGrwooRVGwQMcZdJJO0jSZ//9nJk6nVaceUIqCipx8Pzxhp/Qwtm/myXMnhA8s9rX3WnsdzoAj/4Fqpwz+LcmnDJ6r3+9jGAaKogCQpilBEDAej0/8WdUZ73B1v9/Htm0Mw8C2bXRdp16vA5AkCZvNBs/zxHs0Gp1Y8cSJXdel1+sxGAxwHIdut0un06HZbFZOHEURm80G3/dZLBY4jsNsNmMymby59pvgq6srbm5uGAwGfPnyBdu2MU2TVqvF+fk5svzPr1mWsdvtiKKIx8dHPM/DsizG4zGqqjIcDl9d/1Xw1dUV379/5/r6msFgQK/Xw7IsOp0OmqZRr9dRFIXj8UiWZRwOB7bbLZvNRnil1WohSRJ5nvPr168XjBdg13W5ubnh+vqab9++4boul5eXmKaJruuoqoqiKEiSxPF4JM9z0jTlcDgQhqHwSLmxPM/J8/xF3F+Ay5gOBgNc18V1XSzLQtd1NE1DlmVqtWoWFkVBmqaoqkqj0RBhSNOU/X7Pcrn8M7jf74uY9no9Li8vsSwLwzDQNA1JknhNtVqNRqOBJEliUyW0vOnT6bSScpWt27aN4zjYto1lWXS7XXHSt6BPJcsymqah6zqmaXJxcYFlWeJ5qgrYMAy63S6madLpdD4ELSXLMufn5+i6TrvdxjRNDMPAMIyKnQAPBgNs2xY3UtO0Srw+IkVRUFWVVqtFs9nENE0cx6Hf7wsbATYMg3a7XYEqivLiIr1HkiShKAr1eh1N02g2m8L9pcSqiqIImCzLyLL8IRc/VwmXZVls4qn3BPjs7Kzy/A0VRfHmNwEuioI8z8myjCzLROL/vyrXyLKMNE1JkoQ0TcV3AS7LXhzHHA4HDocDaZpyPJ5sXi9UVrM4jtntdmy3W9brNUEQCBsBDoKAzWZDGIZEUcR+vxfwjypJEvb7PVEUEYYhvu/jed7rBeT3799Mp1M8z8P3fYIgIAxD9vv9h1yepim73Y4wDEWr9H2f9Xpdsask6Ww2Yzab4TgOhmHQbDZpNBrUarV3FZI0TYVbfd9nuVzieR6e57FarSq2FfDd3R22bXNxcUG73UZVVZECeZ6LrvM8t8uYllDP85jP5zw8PDCZTBiPx6e703Q6ZTQa0Wq1xHhT9tyyLT7N8TzPSZKEOI6Fa8vpYzQaMRqNWCwWzzEvwZPJBFVVkSSJoihIkkTc+HLseVoMyl4cRRFBELBcLnl4eOD+/p4fP37w8+fPVwfBVwvxcDikKAqyLCOOY6IowrZtut0urVarEoJy9AnDkNVqxXw+F6cdDofc3t6+hnh75rq9vSXLMlarFcvlEsdxRG9+OnOVfffx8ZHFYsFiseD+/p75fP7Hkfdd4+3Xr1/59OkTnz9/xjRNMYmUM9d2uxWxXSwW3N3dnVryfeBS5TBfphj8c7niOGa9Xv9xnH2uD4H/pj7ebP+S/gefbk5Qf5VRmAAAAABJRU5ErkJggg=="
                  />
                </g>
              </mask>
              <linearGradient
                id="linear-gradient"
                x1="16.65"
                y1="25.33"
                x2="26.57"
                y2="25.49"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#40daff" />
                <stop offset="1" stop-color="#2199e9" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                x1="16.62"
                y1="27.59"
                x2="26.54"
                y2="27.75"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-3"
                x1="16.62"
                y1="27.49"
                x2="26.54"
                y2="27.64"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-4"
                x1="16.77"
                y1="17.7"
                x2="26.7"
                y2="17.86"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-5"
                x1="41.65"
                y1="72.33"
                x2="51.57"
                y2="72.49"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-6"
                x1="41.62"
                y1="74.59"
                x2="51.54"
                y2="74.75"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-7"
                x1="41.62"
                y1="74.49"
                x2="51.54"
                y2="74.64"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-8"
                x1="41.77"
                y1="64.7"
                x2="51.7"
                y2="64.86"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-9"
                x1="51.65"
                y1="125.33"
                x2="61.57"
                y2="125.49"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-10"
                x1="51.62"
                y1="127.59"
                x2="61.54"
                y2="127.75"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-11"
                x1="51.62"
                y1="127.49"
                x2="61.54"
                y2="127.64"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-12"
                x1="51.77"
                y1="117.7"
                x2="61.7"
                y2="117.86"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-13"
                x1="43.65"
                y1="180.33"
                x2="53.57"
                y2="180.49"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-14"
                x1="43.62"
                y1="182.59"
                x2="53.54"
                y2="182.75"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-15"
                x1="43.62"
                y1="182.49"
                x2="53.54"
                y2="182.64"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-16"
                x1="43.77"
                y1="172.7"
                x2="53.7"
                y2="172.86"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-17"
                x1="19.65"
                y1="229.33"
                x2="29.57"
                y2="229.49"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-18"
                x1="19.62"
                y1="231.59"
                x2="29.54"
                y2="231.75"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-19"
                x1="19.62"
                y1="231.49"
                x2="29.54"
                y2="231.64"
                xlink:href="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-20"
                x1="19.77"
                y1="221.7"
                x2="29.7"
                y2="221.86"
                xlink:href="#linear-gradient"
              />
            </defs>
            <g class="cls-1">
              <g id="图层_2" data-name="图层 2">
                <g id="图层_1-2" data-name="图层 1">
                  <path
                    class="cls-2"
                    d="M8,6A173.21,173.21,0,0,1,56.87,126.91,173.17,173.17,0,0,1,8.29,247.41"
                  />
                  <g class="cls-3">
                    <image
                      class="cls-4"
                      width="44"
                      height="44"
                      xlink:href="data:image/png;base64,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"
                    />
                    <circle class="cls-5" cx="21.59" cy="21.97" r="12.32" />
                    <circle class="cls-6" cx="21.59" cy="21.97" r="12.32" />
                    <g class="cls-7">
                      <g class="cls-8">
                        <circle class="cls-9" cx="21.59" cy="21.97" r="12.32" />
                        <circle class="cls-10" cx="21.59" cy="21.97" r="12.32" />
                      </g>
                    </g>
                  </g>
                  <g class="cls-3">
                    <image
                      class="cls-4"
                      width="44"
                      height="44"
                      transform="translate(25 48)"
                      xlink:href="data:image/png;base64,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"
                    />
                    <circle class="cls-5" cx="46.72" cy="69.97" r="12.32" />
                    <circle class="cls-6" cx="46.72" cy="69.97" r="12.32" />
                    <g class="cls-11">
                      <g class="cls-8">
                        <circle class="cls-9" cx="46.72" cy="69.97" r="12.32" />
                        <circle class="cls-10" cx="46.72" cy="69.97" r="12.32" />
                      </g>
                    </g>
                  </g>
                  <g class="cls-3">
                    <image
                      class="cls-4"
                      width="44"
                      height="44"
                      transform="translate(35 101)"
                      xlink:href="data:image/png;base64,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"
                    />
                    <circle class="cls-5" cx="57.28" cy="123.02" r="12.32" />
                    <circle class="cls-6" cx="57.28" cy="123.02" r="12.32" />
                    <g class="cls-12">
                      <g class="cls-8">
                        <circle class="cls-9" cx="57.28" cy="123.02" r="12.32" />
                        <circle class="cls-10" cx="57.28" cy="123.02" r="12.32" />
                      </g>
                    </g>
                  </g>
                  <g class="cls-3">
                    <image
                      class="cls-4"
                      width="44"
                      height="44"
                      transform="translate(27 155)"
                      xlink:href="data:image/png;base64,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"
                    />
                    <circle class="cls-5" cx="49" cy="177.38" r="12.32" />
                    <circle class="cls-6" cx="49" cy="177.38" r="12.32" />
                    <g class="cls-13">
                      <g class="cls-8">
                        <circle class="cls-9" cx="49" cy="177.38" r="12.32" />
                        <circle class="cls-10" cx="49" cy="177.38" r="12.32" />
                      </g>
                    </g>
                  </g>
                  <g class="cls-3">
                    <image
                      class="cls-4"
                      width="44"
                      height="44"
                      transform="translate(3 205)"
                      xlink:href="data:image/png;base64,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"
                    />
                    <circle class="cls-5" cx="24.97" cy="227.12" r="12.32" />
                    <circle class="cls-6" cx="24.97" cy="227.12" r="12.32" />
                    <g class="cls-14">
                      <g class="cls-8">
                        <circle class="cls-9" cx="24.97" cy="227.12" r="12.32" />
                        <circle class="cls-10" cx="24.97" cy="227.12" r="12.32" />
                      </g>
                    </g>
                  </g>
                  <path
                    class="cls-15"
                    d="M26.8,28.88a.54.54,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3A2.27,2.27,0,0,0,24,23H19.22A2.27,2.27,0,0,0,17,25.33v3a.57.57,0,0,1-.56.57.53.53,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3a3.48,3.48,0,0,1,1-2.43,3.32,3.32,0,0,1,2.39-1H24a3.34,3.34,0,0,1,2.39,1,3.43,3.43,0,0,1,1,2.43v3a.59.59,0,0,1-.16.4.56.56,0,0,1-.4.17Z"
                  />
                  <path
                    class="cls-16"
                    d="M18.37,28.88a.56.56,0,0,1-.4-.17.55.55,0,0,1-.16-.4V26.93a.56.56,0,1,1,1.12,0v1.38a.57.57,0,0,1-.56.57Z"
                  />
                  <path
                    class="cls-17"
                    d="M24.83,28.88a.56.56,0,0,1-.4-.17.59.59,0,0,1-.16-.4V26.93a.57.57,0,0,1,.56-.58.58.58,0,0,1,.57.58v1.38a.58.58,0,0,1-.57.57Z"
                  />
                  <path
                    class="cls-18"
                    d="M21.77,20.9a3.12,3.12,0,1,1,3.12-3.12A3.13,3.13,0,0,1,21.77,20.9Zm0-5.29a2.17,2.17,0,1,0,2.17,2.17A2.18,2.18,0,0,0,21.77,15.61Z"
                  />
                  <path
                    class="cls-19"
                    d="M51.8,75.88a.54.54,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3A2.27,2.27,0,0,0,49,70H44.22A2.27,2.27,0,0,0,42,72.33v3a.57.57,0,0,1-.56.57.53.53,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3a3.48,3.48,0,0,1,1-2.43,3.32,3.32,0,0,1,2.39-1H49a3.34,3.34,0,0,1,2.39,1,3.43,3.43,0,0,1,1,2.43v3a.59.59,0,0,1-.16.4.56.56,0,0,1-.4.17Z"
                  />
                  <path
                    class="cls-20"
                    d="M43.37,75.88a.56.56,0,0,1-.4-.17.55.55,0,0,1-.16-.4V73.93a.56.56,0,1,1,1.12,0v1.38a.57.57,0,0,1-.56.57Z"
                  />
                  <path
                    class="cls-21"
                    d="M49.83,75.88a.56.56,0,0,1-.4-.17.59.59,0,0,1-.16-.4V73.93a.57.57,0,0,1,.56-.58.58.58,0,0,1,.57.58v1.38a.58.58,0,0,1-.57.57Z"
                  />
                  <path
                    class="cls-22"
                    d="M46.77,67.9a3.12,3.12,0,1,1,3.12-3.12A3.13,3.13,0,0,1,46.77,67.9Zm0-5.29a2.17,2.17,0,1,0,2.17,2.17A2.18,2.18,0,0,0,46.77,62.61Z"
                  />
                  <path
                    class="cls-23"
                    d="M61.8,128.88a.54.54,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3A2.27,2.27,0,0,0,59,123H54.22A2.27,2.27,0,0,0,52,125.33v3a.57.57,0,0,1-.56.57.53.53,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3a3.48,3.48,0,0,1,1-2.43,3.32,3.32,0,0,1,2.39-1H59a3.34,3.34,0,0,1,2.39,1,3.43,3.43,0,0,1,1,2.43v3a.59.59,0,0,1-.16.4.56.56,0,0,1-.4.17Z"
                  />
                  <path
                    class="cls-24"
                    d="M53.37,128.88a.56.56,0,0,1-.4-.17.55.55,0,0,1-.16-.4v-1.38a.56.56,0,1,1,1.12,0v1.38a.57.57,0,0,1-.56.57Z"
                  />
                  <path
                    class="cls-25"
                    d="M59.83,128.88a.56.56,0,0,1-.4-.17.59.59,0,0,1-.16-.4v-1.38a.57.57,0,0,1,.56-.58.58.58,0,0,1,.57.58v1.38a.58.58,0,0,1-.57.57Z"
                  />
                  <path
                    class="cls-26"
                    d="M56.77,120.9a3.12,3.12,0,1,1,3.12-3.12A3.13,3.13,0,0,1,56.77,120.9Zm0-5.29a2.17,2.17,0,1,0,2.17,2.17A2.18,2.18,0,0,0,56.77,115.61Z"
                  />
                  <path
                    class="cls-27"
                    d="M53.8,183.88a.54.54,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3A2.27,2.27,0,0,0,51,178H46.22A2.27,2.27,0,0,0,44,180.33v3a.57.57,0,0,1-.56.57.53.53,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3a3.48,3.48,0,0,1,1-2.43,3.32,3.32,0,0,1,2.39-1H51a3.34,3.34,0,0,1,2.39,1,3.43,3.43,0,0,1,1,2.43v3a.59.59,0,0,1-.16.4.56.56,0,0,1-.4.17Z"
                  />
                  <path
                    class="cls-28"
                    d="M45.37,183.88a.56.56,0,0,1-.4-.17.55.55,0,0,1-.16-.4v-1.38a.56.56,0,1,1,1.12,0v1.38a.57.57,0,0,1-.56.57Z"
                  />
                  <path
                    class="cls-29"
                    d="M51.83,183.88a.56.56,0,0,1-.4-.17.59.59,0,0,1-.16-.4v-1.38a.57.57,0,0,1,.56-.58.58.58,0,0,1,.57.58v1.38a.58.58,0,0,1-.57.57Z"
                  />
                  <path
                    class="cls-30"
                    d="M48.77,175.9a3.12,3.12,0,1,1,3.12-3.12A3.13,3.13,0,0,1,48.77,175.9Zm0-5.29a2.17,2.17,0,1,0,2.17,2.17A2.18,2.18,0,0,0,48.77,170.61Z"
                  />
                  <path
                    class="cls-31"
                    d="M29.8,232.88a.54.54,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3A2.27,2.27,0,0,0,27,227H22.22A2.27,2.27,0,0,0,20,229.33v3a.57.57,0,0,1-.56.57.53.53,0,0,1-.4-.17.56.56,0,0,1-.17-.4v-3a3.48,3.48,0,0,1,1-2.43,3.32,3.32,0,0,1,2.39-1H27a3.34,3.34,0,0,1,2.39,1,3.43,3.43,0,0,1,1,2.43v3a.59.59,0,0,1-.16.4.56.56,0,0,1-.4.17Z"
                  />
                  <path
                    class="cls-32"
                    d="M21.37,232.88a.56.56,0,0,1-.4-.17.55.55,0,0,1-.16-.4v-1.38a.56.56,0,1,1,1.12,0v1.38a.57.57,0,0,1-.56.57Z"
                  />
                  <path
                    class="cls-33"
                    d="M27.83,232.88a.56.56,0,0,1-.4-.17.59.59,0,0,1-.16-.4v-1.38a.57.57,0,0,1,.56-.58.58.58,0,0,1,.57.58v1.38a.58.58,0,0,1-.57.57Z"
                  />
                  <path
                    class="cls-34"
                    d="M24.77,224.9a3.12,3.12,0,1,1,3.12-3.12A3.13,3.13,0,0,1,24.77,224.9Zm0-5.29a2.17,2.17,0,1,0,2.17,2.17A2.18,2.18,0,0,0,24.77,219.61Z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>-->
        <ul class="lv-2__list">
          <li class="lv-2__item" v-for="i in fuzuzhangList" :key="i.Name">
            <div class="lv-2__item__left">
              <span class="label text-primary">副组长</span>
              <span class="value">{{i.Name}}</span>
            </div>
            <div class="lv-2__item__right">
              <i class="iconfont iconziyuan1"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="lv-3">
        <div class="lv-3__bg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 200.41 242.3"
          >
            <defs>
              <linearGradient
                id="linear-gradient_lv3"
                x1="0.36"
                y1="121.3"
                x2="200.41"
                y2="121.3"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#27a8e2" />
                <stop offset="0.03" stop-color="#279fe2" stop-opacity="0.88" />
                <stop offset="0.07" stop-color="#2791e2" stop-opacity="0.69" />
                <stop offset="0.12" stop-color="#2784e2" stop-opacity="0.53" />
                <stop offset="0.18" stop-color="#2779e2" stop-opacity="0.38" />
                <stop offset="0.24" stop-color="#2770e2" stop-opacity="0.26" />
                <stop offset="0.3" stop-color="#2769e2" stop-opacity="0.17" />
                <stop offset="0.38" stop-color="#2763e2" stop-opacity="0.09" />
                <stop offset="0.48" stop-color="#275fe2" stop-opacity="0.04" />
                <stop offset="0.62" stop-color="#275de2" stop-opacity="0.01" />
                <stop offset="1" stop-color="#275ce2" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              style="fill: none;
    stroke: #55a8e5;
    stroke-miterlimit: 10;"
              d="M.36.35A173.19,173.19,0,0,1,49.28,121.21,173.13,173.13,0,0,1,.7,241.71"
            />
            <path
              class="cls-2"
              style="opacity: 0.6;
    fill: url(#linear-gradient_lv3);"
              d="M.5,242.12c30.08-31.44,49.18-73.63,49.18-120.73A172.92,172.92,0,0,0,.36.35l200,0v242Z"
            />
          </svg>
        </div>
        <ul class="lv-3__list">
          <li class="lv-3__item" v-for="(i,index) in renyuanList" :key="index">
            <span class="text-primary">{{i.DeptName}}：</span>
            <span class="text-info">{{i.Name}}</span>
          </li>
        </ul>
      </div>
    </main>

    <div v-show="type==2" style="height:calc(100% - .4rem);">
      <div class="toolbar">
        <div class="check">
          <div class="check-item" @click="currentLv=1" :class="currentLv==1?'active':''">
            <span>12级以下</span>
          </div>
          <div class="check-item" @click="currentLv=2" :class="currentLv==2?'active':''">
            <span>12级以上</span>
          </div>
        </div>

        <div class="radius-btn">展示预案</div>

        <el-select v-model="query.Id" clearable placeholder="请选择预案名称" @change="refresh">
          <el-option v-for="i in yuanSelections" v-bind="i" :key="i.value"></el-option>
        </el-select>
      </div>

      <div class="body">
        <ul v-if="currentLv==1">
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan5"></i>
              <span>码头防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup1[1],index)"
                v-for="(i,index) in listgroup1[1]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <span class="text-success">{{DirectionMap[i.Direction]}}</span>
              </li>
            </ul>
          </li>
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan6"></i>
              <span>船坞防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup1[2],index)"
                v-for="(i,index) in listgroup1[2]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <span class="text-success">{{DirectionMap[i.Direction]}}</span>
              </li>
            </ul>
          </li>
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan41"></i>
              <span>锚地防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup1[3],index)"
                v-for="(i,index) in listgroup1[3]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <!-- <span class="text-success">{{DirectionMap[i.Direction]}}</span> -->
              </li>
            </ul>
          </li>
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan71"></i>
              <span>航行防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup1[4],index)"
                v-for="(i,index) in listgroup1[4]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <!-- <span class="text-success">{{DirectionMap[i.Direction]}}</span> -->
              </li>
            </ul>
          </li>
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan8"></i>
              <span>开航防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup1[5],index)"
                v-for="(i,index) in listgroup1[5]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <!-- <span class="text-info">{{i.DockingName}}</span> -->
                <!-- <span class="text-success">{{DirectionMap[i.Direction]}}</span> -->
              </li>
            </ul>
          </li>
        </ul>

        <ul v-if="currentLv==2">
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan5"></i>
              <span>码头防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup2[1],index)"
                v-for="(i,index) in listgroup2[1]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <span class="text-success">{{DirectionMap[i.Direction]}}</span>
              </li>
            </ul>
          </li>
          <li class="item">
            <div class="item-left">
              <i class="iconfont iconziyuan6"></i>
              <span>船坞防台</span>
            </div>
            <ul class="item-right">
              <li
                class="right-item"
                :class="getItemClass(listgroup2[2],index)"
                v-for="(i,index) in listgroup2[2]"
                :key="index"
              >
                <span class="text-primary">{{i.ShipName}}</span>
                <span class="text-info">{{i.DockingName}}</span>
                <span class="text-success">{{DirectionMap[i.Direction]}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 防抗台措施
 */
import { getDefendTyphoon, getTyphoonPlanName, getTyphoonPlan } from "@/api";

export default {
  data() {
    return {
      loading: false,
      type: 1,
      vm: {
        Count: 236,
      },

      query: {
        Id: "",
      },

      listgroup1: {
        Count: 0,
      },

      listgroup2: {
        Count: 0,
      },

      DirectionMap: {
        1: "左靠",
        2: "右靠",
        3: "艏进",
        4: "艉进",
      },

      vm2: {
        Count: 23,

        TyphoonPlanList1: [],
        TyphoonPlanList2: [],
      },

      yuanSelections: [],
      currentLv: 2,
    };
  },

  watch: {
    type() {
      this.refresh();
    },
  },

  computed: {
    fuzuzhangList() {
      const list = this.vm.DeputyLeaderList || [];
      if (list && list.length >= 5) {
        return list.slice(0, 5);
      } else {
        let l = 5 - list.length;
        let arr = list && list.length > 0 ? list : [];

        for (let i = 0; i < l; i++) {
          arr.push({ Name: "-" });
        }
        return arr;
      }
    },

    renyuanList() {
      const list = this.vm.KeyPersonnelList2 || [];

      if (list && list.length >= 5) {
        return list.slice(0, 5);
      } else {
        let l = 5 - list.length;
        let arr = list && list.length > 0 ? list : [];

        for (let i = 0; i < l; i++) {
          arr.push({ Dept: "-", Name: "-" });
        }
        return arr;
      }
    },
  },

  methods: {
    getItemClass(list, curIndex) {
      const length = list.length;
      const isOdd = length % 2 !== 0;

      if (isOdd) {
        if (curIndex === list.length - 1) {
          return "no-border";
        }
      } else {
        if (curIndex === list.length - 1 || curIndex === list.length - 2) {
          return "no-border";
        }
      }
    },

    refresh() {
      this.loading = true;
      if (this.type == 1) {
        //获取人员调配
        getDefendTyphoon()
          .then((data) => {
            this.vm = data.data.rows[0];
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        //获取预案
        getTyphoonPlan(this.query.Id || "")
          .then((data) => {
            this.vm2 = data.data[0];
            this.handleData();
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },

    handleData() {
      //1码头防台，2船坞防台，3锚地防台，4航行防台，5开航防台

      //12级以下
      this.listgroup1 = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      };

      //12级以上
      this.listgroup2 = {
        1: [],
        2: [],
      };

      let count1 = 0,
        count2 = 0;

      this.vm2.TyphoonPlanList1.forEach((i) => {
        this.listgroup1[i.Type].push(i);
        count1++;
      });

      this.vm2.TyphoonPlanList2.forEach((i) => {
        this.listgroup2[i.Type].push(i);
        count2++;
      });

      this.listgroup1.Count = count1;
      this.listgroup2.Count = count2;
    },
  },
  created() {
    getTyphoonPlanName().then((data) => {
      this.yuanSelections = data.data.map((i) => {
        return {
          label: i.Name,
          value: i.Id,
        };
      });
      if (
        !this.query.Id &&
        this.yuanSelections &&
        this.yuanSelections.length >= 1
      ) {
        this.query.Id = this.yuanSelections[0].value;
      }
    });

    this.refresh();
  },
};
</script>

<style scoped lang="scss">
header {
  padding: 0.1rem 0.15rem 0 0.3rem;
  height: 0.4rem;
  line-height: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main {
  height: calc(100% - 0.4rem);
  padding: 0.1rem 0;
  display: flex;
}

.toolbar {
  // background: pink;
  width: 100%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.check {
  height: 0.24rem;
  line-height: 0.24rem;
  width: 30%;
  display: flex;
  overflow: hidden;
  font-size: 0.12rem;
  .check-item {
    width: 50%;
    text-align: center;
    color: rgb(95, 103, 107);
    position: relative;
    padding: 0 0.1rem;
    cursor: pointer;

    span {
      position: relative;
    }

    &:before {
      content: "";
      position: absolute;
      left: -0.1rem;
      top: 0;
      height: 100%;
      width: 115%;
      background: rgb(33, 45, 53);
      transform: skew(-40deg);
    }

    &:last-child {
      &:before {
        left: unset !important;
        right: -0.1rem;
      }
    }

    &.active {
      color: rgb(105, 198, 255);
      &::before {
        background: rgb(0, 65, 130);
      }
    }
  }
}

.radius-btn {
  height: 0.24rem;
  line-height: 0.22rem;
  width: 0.8rem;
  border-radius: 0.12rem;
  box-sizing: border-box;
  border: 0.01rem solid rgb(64, 151, 255);
  text-align: center;
  color: rgb(64, 151, 255);
  font-size: 0.12rem;
  cursor: pointer;

  &:hover {
    background: rgba(64, 151, 255, 0.2);
  }
}

.body {
  height: calc(100% - 0.4rem);
  overflow-y: auto;
  padding: 0 0.1rem;
  // background: red;

  & > ul {
    .item {
      background: rgb(18, 30, 41);
      border: 0.02rem solid rgb(63, 105, 138);
      border-radius: 0.08rem;
      padding: 0.1rem;
      padding-left: 0;
      display: flex;
      font-size: 0.12rem;
      margin-bottom: 0.1rem;
      .item-left {
        width: 0.7rem;
        border-right: 0.02rem solid rgb(63, 105, 138);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        i {
          font-size: 0.18rem;
          color: rgb(131, 217, 255);
        }
        span {
          font-size: 0.14rem;
          font-weight: bold;
          margin-left: 0.04rem;
        }
      }
      .item-right {
        width: calc(100% - 0.7rem);

        .right-item {
          width: 50%;
          float: left;
          height: 0.3rem;
          line-height: 0.3rem;
          position: relative;
          padding: 0 0.1rem;
          border-right: 0.02rem solid rgb(63, 105, 138);
          display: flex;
          justify-content: space-around;

          &.no-border {
            &:after {
              display: none;
            }
          }

          .text-primary {
            width: 0.6rem;
            height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .text-info {
            width: 0.6rem;
            height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:nth-child(2n) {
            border-right: none;
          }

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0.1rem;
            right: 0.1rem;
            height: 0.02rem;
            background: rgb(63, 105, 138);
          }
        }
      }
    }
  }
}

.lv-1 {
  width: 30%;
  display: flex;
  align-items: center;
  .svg {
    width: 100%;
  }
}

.lv-2 {
  width: 25%;
  transform: translateX(-12%);
  // background: rgba(blue, 0.3);
  .svg {
    height: 100%;
    width: 100%;
  }

  .lv-2__list {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // justify-content: flex-start;

    .lv-2__item {
      display: flex;
      font-size: 0.12rem;
      width: 60%;
      margin-bottom: 0.14rem;
      text-align: center;
      align-items: center;
      // background: rgba(pink, 0.3);

      .lv-2__item__left {
        display: flex;
        flex-direction: column;
        padding-right: 0.05rem;
        overflow: hidden;
        width: calc(100% - 0.26rem);
        .label,
        .value {
          height: 0.16rem;
          line-height: 0.16rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .lv-2__item__right {
        width: 0.26rem;
        height: 0.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0.26rem;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
        border: 0.01rem solid rgb(42, 181, 221);
        box-shadow: 0 0 0.06rem 0.04rem rgba(42, 181, 221, 0.4),
          inset 0 0 0.02rem 0.01rem rgba(42, 181, 221, 0.4);
        i {
          font-size: 0.14rem;
          background-image: linear-gradient(to right, #47bbfe, #1d8fea);
          -webkit-background-clip: text;
          color: transparent;
        }
      }

      &:nth-child(1) {
        transform: translateX(-0.15rem);
      }
      &:nth-child(2) {
        transform: translateX(0.08rem);
      }
      &:nth-child(3) {
        transform: translateX(0.15rem);
      }
      &:nth-child(4) {
        transform: translateX(0.08rem);
      }
      &:nth-child(5) {
        transform: translateX(-0.15rem);
      }
    }
  }
}

.lv-2__bg {
  width: 100%;
  height: 100%;
}

.lv-3 {
  width: 45%;
  transform: translateX(-18%);

  .lv-3__bg {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-15%);
    // display: none;
    svg {
      width: 84%;
    }
  }

  .lv-3__list {
    height: 100%;
    padding: 0.03rem 0;
    padding-left:9%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 0.12rem;

    .lv-3__item {
      margin-bottom: 0.1rem;
      position: relative;
      width: auto;
      display: inline-block;
      height: 0.26rem;
      line-height: 0.26rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 0.05rem;
      background-image: linear-gradient(
        to top,
        rgb(25, 66, 83) 0%,
        rgba(19, 54, 70, 0) 100%
      );

      &:nth-child(1) {
        transform: translateX(-0.2rem);
      }
      &:nth-child(2) {
        transform: translateX(0.03rem);
      }
      &:nth-child(3) {
        transform: translateX(0.1rem);
      }
      &:nth-child(4) {
        transform: translateX(0.03rem);
      }
      &:nth-child(5) {
        transform: translateX(-0.2rem);
      }

      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.01rem;
        background-image: linear-gradient(
          to right,
          rgb(59, 126, 187) 0%,
          rgb(59, 126, 187) 50%,
          transparent 50%
        );
        background-size: 0.12rem 0.01rem;
        background-repeat: repeat-x;
      }
      .label {
      }
      .value {
      }
    }
  }
}

//svg
.lv-1 {
  .cls-1 {
    isolation: isolate;
  }

  .cls-2 {
    opacity: 0.3;
  }

  .cls-3 {
    opacity: 0.7;
  }

  .cls-4 {
    opacity: 0.45;
    mix-blend-mode: screen;
  }

  .cls-5 {
    fill: #0a182d;
  }

  .cls-10,
  .cls-11,
  .cls-13,
  .cls-17,
  .cls-19,
  .cls-23,
  .cls-25,
  .cls-26,
  .cls-28,
  .cls-6 {
    fill: none;
    stroke-miterlimit: 10;
  }

  .cls-11,
  .cls-17,
  .cls-23,
  .cls-26,
  .cls-6 {
    stroke: #55a8e5;
  }

  .cls-10,
  .cls-6 {
    stroke-width: 0.36px;
  }

  .cls-7 {
    mask: url(#mask);
  }

  .cls-8 {
    opacity: 0.65;
  }

  .cls-9 {
    fill: #06e8ff;
  }

  .cls-10,
  .cls-13,
  .cls-19,
  .cls-25,
  .cls-28 {
    stroke: #06e8ff;
  }

  .cls-11,
  .cls-13 {
    stroke-width: 0.78px;
  }

  .cls-12 {
    mask: url(#mask-2);
  }

  .cls-14 {
    mask: url(#mask-3);
  }

  .cls-15 {
    mask: url(#mask-4);
  }

  .cls-16 {
    mask: url(#mask-5);
  }

  .cls-17,
  .cls-19 {
    stroke-width: 0.36px;
  }

  .cls-18 {
    mask: url(#mask-6);
  }

  .cls-20 {
    mask: url(#mask-7);
  }

  .cls-21 {
    mask: url(#mask-8);
  }

  .cls-22 {
    mask: url(#mask-9);
  }

  .cls-23,
  .cls-25 {
    stroke-width: 1.11px;
  }

  .cls-24 {
    mask: url(#mask-10);
  }

  .cls-26,
  .cls-28 {
    stroke-width: 0.59px;
  }

  .cls-27 {
    mask: url(#mask-11);
  }

  .cls-29 {
    mask: url(#mask-12);
  }

  .cls-30 {
    font-size: 12px;
    fill: #fff;
  }

  .cls-30,
  .cls-32 {
    font-family: MicrosoftYaHei, Microsoft YaHei;
  }

  .cls-31 {
    fill: #50fffa;
  }

  .cls-32 {
    font-size: 14px;
    fill: #2c91ff;
  }

  .cls-33 {
    fill: url(#linear-gradient);
  }

  .cls-34 {
    fill: url(#linear-gradient-2);
  }

  .cls-35 {
    fill: url(#linear-gradient-3);
  }

  .cls-36 {
    fill: url(#linear-gradient-4);
  }

  .cls-37 {
    filter: url(#luminosity-invert);
  }
}

.lv-2 {
  .cls-1 {
    isolation: isolate;
  }

  .cls-10,
  .cls-2,
  .cls-6 {
    fill: none;
    stroke-miterlimit: 10;
  }

  .cls-2,
  .cls-6 {
    stroke: #55a8e5;
  }

  .cls-2 {
    stroke-width: 0.48px;
    opacity: 0.7;
  }

  .cls-3 {
    opacity: 0.9;
  }

  .cls-4 {
    opacity: 0.45;
    mix-blend-mode: screen;
  }

  .cls-5 {
    fill: #0a182d;
  }

  .cls-10,
  .cls-6 {
    stroke-width: 0.27px;
  }

  .cls-7 {
    mask: url(#mask);
  }

  .cls-8 {
    opacity: 0.55;
  }

  .cls-9 {
    /*fill: #06e8ff;*/
  }

  .cls-10 {
    stroke: #06e8ff;
  }

  .cls-11 {
    mask: url(#mask-2);
  }

  .cls-12 {
    mask: url(#mask-3);
  }

  .cls-13 {
    mask: url(#mask-4);
  }

  .cls-14 {
    mask: url(#mask-5);
  }

  .cls-15 {
    fill: url(#linear-gradient);
  }

  .cls-16 {
    fill: url(#linear-gradient-2);
  }

  .cls-17 {
    fill: url(#linear-gradient-3);
  }

  .cls-18 {
    fill: url(#linear-gradient-4);
  }

  .cls-19 {
    fill: url(#linear-gradient-5);
  }

  .cls-20 {
    fill: url(#linear-gradient-6);
  }

  .cls-21 {
    fill: url(#linear-gradient-7);
  }

  .cls-22 {
    fill: url(#linear-gradient-8);
  }

  .cls-23 {
    fill: url(#linear-gradient-9);
  }

  .cls-24 {
    fill: url(#linear-gradient-10);
  }

  .cls-25 {
    fill: url(#linear-gradient-11);
  }

  .cls-26 {
    fill: url(#linear-gradient-12);
  }

  .cls-27 {
    fill: url(#linear-gradient-13);
  }

  .cls-28 {
    fill: url(#linear-gradient-14);
  }

  .cls-29 {
    fill: url(#linear-gradient-15);
  }

  .cls-30 {
    fill: url(#linear-gradient-16);
  }

  .cls-31 {
    fill: url(#linear-gradient-17);
  }

  .cls-32 {
    fill: url(#linear-gradient-18);
  }

  .cls-33 {
    fill: url(#linear-gradient-19);
  }

  .cls-34 {
    fill: url(#linear-gradient-20);
  }

  .cls-35 {
    filter: url(#luminosity-invert);
  }
}
</style>