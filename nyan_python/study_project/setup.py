from setuptools import setup, find_packages

setup(
    name='nyan_python',
    version='0.1.0',
    description='Nyan Python',
    author='Nyan',
    author_email='',
    packages=find_packages(),
    install_requires=[],
    entry_points={
        'console_scripts': [
            'nyan_python=nyan_python.main:main',
        ],
    },
)