import Peer from '../index.js'
import { test, expect } from 'vitest'

test('write string data', function () {
  return new Promise<void>((resolve) => {
    const peer1 = new Peer({ initiator: true })
    const peer2 = new Peer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer1.on('connect', tryTest)
    peer2.on('connect', tryTest)

    function tryTest () {
      if (!peer1.connected || !peer2.connected) return

      peer1.write('hello from peer1', (err) => {
        expect(err).toBeFalsy()
      })

      peer2.on('data', function (data) {
        expect(ArrayBuffer.isView(data)).toBe(true)
        expect(Buffer.from(data as Uint8Array).toString()).toBe('hello from peer1')

        peer2.write('hello from peer2', (err) => {
          expect(err).toBeFalsy()
        })

        peer1.on('data', function (data) {
          expect(ArrayBuffer.isView(data)).toBe(true)
          expect(Buffer.from(data as Uint8Array).toString()).toBe('hello from peer2')

          peer1.on('close', function () { })
          peer1.destroy()
          peer2.on('close', function () { resolve() })
          peer2.destroy()
        })
      })
    }
  })
})

test('write Uint8Array data', function () {
  return new Promise<void>((resolve) => {
    const peer1 = new Peer({ initiator: true })
    const peer2 = new Peer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer1.on('connect', tryTest)
    peer2.on('connect', tryTest)

    function tryTest () {
      if (!peer1.connected || !peer2.connected) return

      const data1 = new Uint8Array([0, 1, 2, 3])
      peer1.write(data1, (err) => {
        expect(err).toBeFalsy()
      })

      peer2.on('data', function (data) {
        expect(ArrayBuffer.isView(data)).toBe(true)
        expect(Buffer.from(data as Uint8Array)).toEqual(Buffer.from([0, 1, 2, 3]))

        const data2 = new Uint8Array([4, 5, 6, 7])
        peer2.write(data2, (err) => {
          expect(err).toBeFalsy()
        })

        peer1.on('data', function (data) {
          expect(ArrayBuffer.isView(data)).toBe(true)
          expect(Buffer.from(data as Uint8Array)).toEqual(Buffer.from([4, 5, 6, 7]))

          peer1.on('close', function () { })
          peer1.destroy()
          peer2.on('close', function () { resolve() })
          peer2.destroy()
        })
      })
    }
  })
})

test('write ArrayBuffer data', function () {
  return new Promise<void>((resolve) => {
    const peer1 = new Peer({ initiator: true })
    const peer2 = new Peer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer1.on('connect', tryTest)
    peer2.on('connect', tryTest)

    function tryTest () {
      if (!peer1.connected || !peer2.connected) return

      const buffer1 = new Uint8Array([10, 11, 12, 13]).buffer
      peer1.write(buffer1, (err) => {
        expect(err).toBeFalsy()
      })

      peer2.on('data', function (data) {
        expect(ArrayBuffer.isView(data)).toBe(true)
        expect(Buffer.from(data as Uint8Array)).toEqual(Buffer.from([10, 11, 12, 13]))

        const buffer2 = new Uint8Array([14, 15, 16, 17]).buffer
        peer2.write(buffer2, (err) => {
          expect(err).toBeFalsy()
        })

        peer1.on('data', function (data) {
          expect(ArrayBuffer.isView(data)).toBe(true)
          expect(Buffer.from(data as Uint8Array)).toEqual(Buffer.from([14, 15, 16, 17]))

          peer1.on('close', function () { })
          peer1.destroy()
          peer2.on('close', function () { resolve() })
          peer2.destroy()
        })
      })
    }
  })
})

test('write Blob data', function () {
  return new Promise<void>((resolve) => {
    const peer1 = new Peer({ initiator: true })
    const peer2 = new Peer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer1.on('connect', tryTest)
    peer2.on('connect', tryTest)

    function tryTest () {
      if (!peer1.connected || !peer2.connected) return

      const blob1 = new Blob(['hello blob'])
      peer1.write(blob1, (err) => {
        expect(err).toBeFalsy()
      })

      peer2.on('data', function (data) {
        expect(ArrayBuffer.isView(data)).toBe(true)
        expect(Buffer.from(data as Uint8Array).toString()).toBe('hello blob')

        const blob2 = new Blob(['goodbye blob'])
        peer2.write(blob2, (err) => {
          expect(err).toBeFalsy()
        })

        peer1.on('data', function (data) {
          expect(ArrayBuffer.isView(data)).toBe(true)
          expect(Buffer.from(data as Uint8Array).toString()).toBe('goodbye blob')

          peer1.on('close', function () { })
          peer1.destroy()
          peer2.on('close', function () { resolve() })
          peer2.destroy()
        })
      })
    }
  })
})

test('write Buffer data', function () {
  return new Promise<void>((resolve) => {
    const peer1 = new Peer({ initiator: true })
    const peer2 = new Peer()

    peer1.on('signal', function (data) {
      peer2.signal(data)
    })

    peer2.on('signal', function (data) {
      peer1.signal(data)
    })

    peer1.on('connect', tryTest)
    peer2.on('connect', tryTest)

    function tryTest () {
      if (!peer1.connected || !peer2.connected) return

      const buf1 = Buffer.from('buffer data')
      peer1.write(buf1, (err) => {
        expect(err).toBeFalsy()
      })

      peer2.on('data', function (data) {
        expect(ArrayBuffer.isView(data)).toBe(true)
        expect(Buffer.from(data as Uint8Array).toString()).toBe('buffer data')

        const buf2 = Buffer.from('more buffer data')
        peer2.write(buf2, (err) => {
          expect(err).toBeFalsy()
        })

        peer1.on('data', function (data) {
          expect(ArrayBuffer.isView(data)).toBe(true)
          expect(Buffer.from(data as Uint8Array).toString()).toBe('more buffer data')

          peer1.on('close', function () { })
          peer1.destroy()
          peer2.on('close', function () { resolve() })
          peer2.destroy()
        })
      })
    }
  })
})

