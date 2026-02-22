import { enumerate, enumerateContents } from '../src/helper/enumerate-entries';

describe('enumerate', () => {
    it('should not throw when entries is empty array', () => {
        const process = jest.fn();
        expect(() => enumerate([], process)).not.toThrow();
        expect(process).not.toHaveBeenCalled();
    });

    it('should call process for each entry', () => {
        const entries = [{ uid: '1' }, { uid: '2' }];
        const process = jest.fn();
        enumerate(entries, process);
        expect(process).toHaveBeenCalledTimes(2);
        expect(process).toHaveBeenNthCalledWith(1, { uid: '1' });
        expect(process).toHaveBeenNthCalledWith(2, { uid: '2' });
    });
});

describe('enumerateContents', () => {
    it('should return content as string when content is not array and type is not doc', () => {
        const content = { type: 'paragraph', children: [] } as any;
        const result = enumerateContents(content);
        expect(result).toEqual(content);
    });

    it('should return array of strings when content is array of docs', () => {
        const doc: any = { type: 'doc', children: [] };
        const result = enumerateContents([doc, doc]);
        expect(Array.isArray(result)).toBe(true);
        expect((result as string[]).length).toBe(2);
        expect((result as string[])[0]).toBe('');
        expect((result as string[])[1]).toBe('');
    });

    it('should throw when content is null', () => {
        expect(() => enumerateContents(null as any)).toThrow();
    });

    it('should throw when content is undefined', () => {
        expect(() => enumerateContents(undefined as any)).toThrow();
    });
});
