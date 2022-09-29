const visitPageAndWaitForElement = (frame, src, id) => {
  frame.src = src;
  return new Promise((test) => {
    frame.onload = async function () {
      const pageFrame = frame.contentDocument;

      let waitForElementInterval = null;
      const waitForElement = () => {
        if (pageFrame.getElementById(id)) {
          frame.onload = test();
          clearInterval(waitForElementInterval);
        }
      };
      waitForElementInterval = setInterval(waitForElement, 100);
    };
  });
};

page('Index', {
  visit: (frame) => {
    return visitPageAndWaitForElement(
      frame,
      'http://localhost:3000/',
      'main-content'
    );
  },
});
