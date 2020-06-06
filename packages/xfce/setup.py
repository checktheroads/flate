import os


def __build():
    os.system('meson --prefix=~/ $PWD/build')


def __install():
    os.system('cd $PWD/build && ninja && ninja install || ninja && ninja install')


if os.path.isdir('$PWD/build'):
    __install()
else:
    __build()
    __install()
