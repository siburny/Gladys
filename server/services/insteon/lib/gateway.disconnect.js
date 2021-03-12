/**
 * @description Disconnects Insteon gateway.
 * @example
 * connect('COM1');
 */
async function disconnect() {
  if(this.insteonGateway) {
    await this.gladys.device.destroy(this.insteonGateway.selector);
  }

  if (this.gw) {
    if (this.gw.close) {
      this.gw.close();
      delete this.gw.close;
    }

    delete this.gw;
  }
}

module.exports = {
  disconnect,
};
