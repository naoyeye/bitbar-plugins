#!/bin/bash

# <bitbar.title>BTC</bitbar.title>
# <bitbar.image>http://i.imgur.com/V8dABjz.png</bitbar.image>
# <bitbar.author>Tim Paine</bitbar.author>
# <bitbar.author.github>theocean154</bitbar.author.github> 

# bitcoin_icon='iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAACXBIWXMAABYlAAAWJQFJUiTwAAABY0lEQVRIx2P4z0AdyEBzg1DAdIYfQJgCZHmCWdsYMAFRBs0BC2UAWT5g1p6hbZAggwIcrgALVQNZSWDWAQY24g3qwRtJ/xgeMqxkCGJgotQgGLzAoEUdg/4zvGQQIxzYLAyODF/gQv0MlgwWDK4MOQxbgV5DKG0nLtZ2wIUykII2EMmoU8QZtAWrQQwMB+HiDygzaDNc/CQlBskwfIKLN5JrkAxDFsMTuOh9BiFSDXoHDI2HDB9RlJ1kECc2r20hkI5OMXhQxyAQzCTNoDJgaAgAvaLLEMkwn+EbkuLvDBLkR78yUoD/Z0gn3yAGhnwk5V2UGBRGLYNmICkvIGzQLqwG8TA0oJQAVvgMymcoYehg+AUXWgoM0kygWC/DbpQ4+89wjYERt0FiRNeNX4GlFJ505EykMacZDPGn7HwCBnxiOMcwjcGJcOEvzqADh2vBQk1AVhaYdZCBc7TKpqJBA9ZiAwDMH49EXcmY2QAAAABJRU5ErkJggg=='



BitBarDarkMode=${BitBarDarkMode}
if [ "$BitBarDarkMode" ]; then
  COLOR="green"
else
  COLOR="#2b43a8"
fi

RESULT=$(curl -s "https://api.itbit.com/v1/markets/XBTUSD/ticker")

LAST=$(echo "$RESULT" | egrep -o '"lastPrice":"[0-9]+(\.)?([0-9]{0,}")?' | sed 's/"lastPrice"://' | sed 's/\"//g' | cut -c 1-7)

echo -n "$"; echo "${LAST} | color=${COLOR} size=14 font=Source Code Pro"

