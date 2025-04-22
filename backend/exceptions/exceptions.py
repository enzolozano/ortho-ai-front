class OrthoAiApiError(Exception):
    """base exception class"""

    def __init__(self, message: str = "Service is unavailable", name: str = "Ortho-AI"):
        self.message = message
        self.name = name
        super().__init__(self.message, self.name)

class ResourceNotFoundError(OrthoAiApiError):
    """couldn't find the resource"""

    pass

