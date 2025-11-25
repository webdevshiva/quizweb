const questions = [
    // C Language - Nested For Loop Questions (10 Tricky Questions)
{
    id: 26,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=3; i++) {
        for(j=1; j<=i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What is the output of this C program?",
    options: [
        "*\n* *\n* * *",
        "* * *\n* *\n*",
        "*\n* *\n* * *\n* *\n*",
        "***\n***\n***"
    ],
    correct: 0,
    explanation: "Outer loop runs 3 times (i=1,2,3). Inner loop runs i times each iteration. So: i=1: 1 star, i=2: 2 stars, i=3: 3 stars"
},
{
    id: 27,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=3; i++) {
        for(j=3; j>=i; j--) {
            printf("%d ", j);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What will be printed by this program?",
    options: [
        "3 2 1\n3 2\n3",
        "1 2 3\n1 2\n1", 
        "3 3 3\n2 2\n1",
        "1 1 1\n2 2\n3"
    ],
    correct: 0,
    explanation: "i=1: j=3,2,1 → 3 2 1\n i=2: j=3,2 → 3 2\n i=3: j=3 → 3"
},
{
    id: 28,
    subject: "C Language",
    topic: "Nested Loops", 
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j, count = 1;
    for(i=1; i<=3; i++) {
        for(j=1; j<=i; j++) {
            printf("%d ", count++);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "Identify the output pattern:",
    options: [
        "1\n2 3\n4 5 6",
        "1\n1 2\n1 2 3",
        "1 2 3\n4 5\n6", 
        "1 2 3\n2 3\n3"
    ],
    correct: 0,
    explanation: "count starts at 1 and increments each time. i=1: 1 number, i=2: 2 numbers, i=3: 3 numbers"
},
{
    id: 29,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy", 
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=4; i++) {
        for(j=1; j<=4; j++) {
            if(i == j) 
                printf("1 ");
            else
                printf("0 ");
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What matrix will be printed?",
    options: [
        "1 0 0 0\n0 1 0 0\n0 0 1 0\n0 0 0 1",
        "0 1 1 1\n1 0 1 1\n1 1 0 1\n1 1 1 0",
        "1 1 1 1\n0 0 0 0\n1 1 1 1\n0 0 0 0",
        "1 0 1 0\n0 1 0 1\n1 0 1 0\n0 1 0 1"
    ],
    correct: 0,
    explanation: "When i==j (diagonal elements), print 1. Else print 0. This creates identity matrix."
},
{
    id: 30,
    subject: "C Language", 
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=3; i++) {
        for(j=1; j<=3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What coordinate pairs will be printed?",
    options: [
        "(1,1) (1,2) (1,3)\n(2,1) (2,2) (2,3)\n(3,1) (3,2) (3,3)",
        "(1,1) (2,1) (3,1)\n(1,2) (2,2) (3,2)\n(1,3) (2,3) (3,3)",
        "(1,1) (1,1) (1,1)\n(2,2) (2,2) (2,2)\n(3,3) (3,3) (3,3)",
        "(3,3) (3,2) (3,1)\n(2,3) (2,2) (2,1)\n(1,3) (1,2) (1,1)"
    ],
    correct: 0,
    explanation: "For each i (1-3), j runs 1-3 completely. So we get all combinations row-wise."
},
{
    id: 31, 
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=5; i>=1; i--) {
        for(j=1; j<=i; j++) {
            printf("%d ", i);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "Predict the number pattern:",
    options: [
        "5 5 5 5 5\n4 4 4 4\n3 3 3\n2 2\n1",
        "1 2 3 4 5\n1 2 3 4\n1 2 3\n1 2\n1", 
        "1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5",
        "5 4 3 2 1\n5 4 3 2\n5 4 3\n5 4\n5"
    ],
    correct: 0,
    explanation: "i starts at 5, decreases to 1. For each i, print i repeated i times."
},
{
    id: 32,
    subject: "C Language",
    topic: "Nested Loops", 
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=4; i++) {
        for(j=1; j<=i; j++) {
            printf("%c ", 'A' + j - 1);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What character pattern will be displayed?",
    options: [
        "A\nA B\nA B C\nA B C D",
        "A\nB B\nC C C\nD D D D",
        "A B C D\nA B C\nA B\nA", 
        "D\nC D\nB C D\nA B C D"
    ],
    correct: 0,
    explanation: "'A'+j-1 gives: j=1→A, j=2→B, etc. Each row prints from A up to current position."
},
{
    id: 33,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j, k=0;
    for(i=1; i<=3; i++) {
        for(j=1; j<=i; j++) {
            printf("%d ", ++k);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What is the final value of k and output?",
    options: [
        "k=6, Output: 1\n2 3\n4 5 6",
        "k=3, Output: 1\n2\n3", 
        "k=6, Output: 1 2 3\n4 5\n6",
        "k=9, Output: 1 2 3\n4 5 6\n7 8 9"
    ],
    correct: 0,
    explanation: "k starts at 0, pre-incremented each print. Total prints = 1+2+3 = 6, so k=6 at end."
},
{
    id: 34,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy", 
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=3; i++) {
        for(j=3; j>=1; j--) {
            if(j > i)
                printf("  ");
            else
                printf("%d ", j);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What number pyramid will be created?",
    options: [
        "    1\n  2 1\n3 2 1",
        "1 2 3\n  1 2\n    1",
        "3 2 1\n2 1\n1", 
        "1\n1 2\n1 2 3"
    ],
    correct: 0,
    explanation: "Spaces are printed when j>i, numbers printed in reverse when j<=i. Creates right-aligned reverse number pyramid."
},
{
    id: 35,
    subject: "C Language",
    topic: "Nested Loops",
    difficulty: "Easy",
    code: `#include <stdio.h>
int main() {
    int i, j;
    for(i=1; i<=4; i++) {
        for(j=1; j<=4; j++) {
            printf("%d ", (i-1)*4 + j);
        }
        printf("\\n");
    }
    return 0;
}`,
    text: "What 4x4 number grid will be printed?",
    options: [
        "1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
        "1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16",
        "16 15 14 13\n12 11 10 9\n8 7 6 5\n4 3 2 1", 
        "4 3 2 1\n8 7 6 5\n12 11 10 9\n16 15 14 13"
    ],
    correct: 0,
    explanation: "(i-1)*4 + j formula: Row 1: 0+1,2,3,4; Row 2: 4+1,2,3,4=5,6,7,8; etc."
}
]