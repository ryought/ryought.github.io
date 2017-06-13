// The hashing difficulty.
// 2 ^ difficulty rounds of SHA-256 will be computed.
var difficulty = 16;


// Called whenever the key changes.
var update = function() {
  // Compute the first 16 base64 characters of iterated-SHA-256(domain + '/' + key, 2 ^ difficulty).
  var key = $('#key').val();
  var domain = $('#domain').val().replace(/^\s+|\s+$/g, '').toLowerCase();

  var rounds = Math.pow(2, difficulty);
  var bits = domain + '/' + key;
  for (var i = 0; i < rounds; i += 1) {
    bits = sjcl.hash.sha256.hash(bits);
  }

  var hash = sjcl.codec.base64.fromBits(bits).slice(0, 16);
  $('#hash').val(hash);
  return hash;
};
